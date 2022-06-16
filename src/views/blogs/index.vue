<template>
  <div class="app-container">
    <el-button
      style="float: right; margin-bottom: 20px"
      type="primary"
      plain
      icon="el-icon-plus"
      @click="handleAddRole"
    >
      Добавить новый блог
    </el-button>

    <el-table
      v-loading="tableLoading"
      :data="blogList"
      style="width: 100%; margin-top: 30px"
      class="cursor"
      @row-click="clickItemRow"
    >
      <el-table-column
        label="имя"
        prop="first_name"
      />
      <el-table-column
        label="Фамилия"
        prop="last_name"
      />
      <el-table-column
        label="Эл. адрес"
        prop="email"
      />
      <el-table-column
        label="Свидание"
        prop="date"
      >
        <template slot-scope="scope">
          {{ dayjs(scope.date).format("DD.MM.YYYY") }}
        </template>
      </el-table-column>
      <el-table-column
        label="Статус"
        align="center"
      >
        <template slot-scope="scope">
          <!--          <span>{{scope.row.status}}</span>-->
          <span v-if="scope.row.status"><el-tag>Активный</el-tag></span>
          <span v-else><el-tag type="danger">Не активный</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column
        label="Действия"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            icon="el-icon-edit"
            type="primary"
            @click.native.stop="editBlog(scope.row)"
          />

          <el-button
            size="small"
            icon="el-icon-delete"
            type="danger"
            @click.native.stop="deleteBlog(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      style="float: right"
      :total="total"
      :page.sync="params.page"
      :limit.sync="params.limit"
      @pagination="getList"
    />
    <el-dialog
      :visible.sync="itemDataSee"
      style="border-radius: 20px"
    >
      <blog-card :item="itemData" />
    </el-dialog>
  </div>
</template>

<script>
import { getAdminBlogAll } from '@/api/userInfo'
import {adminBlogDelete} from '@/api/admin'
import Pagination from '@/components/Pagination'
import dayjs from "dayjs";
import BlogCard from "./blogCard.vue";
export default {
  components: {
    BlogCard,
    Pagination
  },
  data() {
    return {
      blogList: [],
      total: 1,
      dialogVisible: false,
      tableLoading: false,
      dialogType: false,
      itemData: {},
      itemDataSee: false,
      params: {
        page: 1,
        limit: 10,
      },
    };
  },

  created() {
    this.getAdminAllBlogList();
  },
  methods: {
    getList (event) {
      this.params = {...event};
      this.getAdminAllBlogList();
    },
    clickItemRow(item) {
      this.itemData = item
      this.itemDataSee = !this.itemDataSee
    },
    adminBlogDelete,
    editBlog (id) {
      this.$router.push({name: 'blogUpdate', params: {id: id.id}})
    },
    deleteBlog(id) {
      this.tableLoading = !this.tableLoading
      this.adminBlogDelete(id)
        .then(() => {
          this.getAdminAllBlogList()
        }).finally(() => {
        this.tableLoading = !this.tableLoading
      })
    },
    dayjs,
    getAdminBlogAll,
    handleAddRole() {this.$router.push({name: 'blogCreate'})},
    getAdminAllBlogList() {
      (this.tableLoading = true),
        this.getAdminBlogAll(this.params)
          .then((res) => {
            this.blogList = res.posts.map((el) => {
              return {
                email: el["admin.email"],
                date: el["admin.createdAt"],
                first_name: el["admin.first_name"],
                last_name: el["admin.last_name"],
                role: el["admin.role"],
                title: el["title"],
                description: el["body"],
                image: process.env.VUE_APP_BASE_API + el["image"],
                id: el["id"],
                adminId: el["admin_id"],
                status: el['status']
              };
            });
          })
          .finally(() => {
            this.tableLoading = false;
          });
    },
  },
};
</script>

<style lang="scss" scoped>
.popconfirm_wrapper {
  .el-popconfirm__action  {
  margin-top: 40px !important;
}
}
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
.cursor {
  cursor: pointer;
}
</style>
