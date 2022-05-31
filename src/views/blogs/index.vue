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
      :visible.sync="dialogVisible"
      title="Добавить новый блог"
    >
      <NewBlogAdd
        ref="updateItetmdata"
        @getBlogAllList="getAdminAllBlogList"
        @handleAddRole="handleAddRole"
      />
    </el-dialog>
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
import {adminBlogDelete, adminSilginBlog} from '@/api/admin'
import NewBlogAdd from "@/views/blogs/newBlogAdd";
import Pagination from '@/components/Pagination'
import { getUserName } from "@/utils/auth";
import dayjs from "dayjs";
import BlogCard from "./blogCard.vue";
// imprt {adminCreate}
export default {
  components: {
    NewBlogAdd,
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
      itemDataSee: false,
      itemData: {},
      params: {
        page: 1,
        limit: 10,
      },
    };
  },
  computed: {
    userRole() {
      return JSON.parse(getUserName()).role;
    },
    routesData() {
      return this.routes;
    },
  },
  watch: {
    dialogVisible (oldvalue, newvalue) {
      console.log(oldvalue, newvalue)
      if(newvalue) {
        this.$router.push({name: this.$route.name})
      } else {
        if(oldvalue&&this.$route.query.item) {
          this.adminSilginBlog(this.$route.query.item)
            .then((res) => {
              const item = res.post;
              const  itemdata = {
                title: item['title'],
                description: item['body'],
                avatar: process.env.VUE_APP_BASE_API+item['image']
              }
              this.$store.dispatch('user/itemDataChanges', itemdata)
            })
        }
      }
    }
  },
  created() {
    this.getAdminAllBlogList();
    // console.log(JSON.parse(getUserName()).role)
  },
  mounted() {
    if(this.$route.query.item) {
      this.dialogVisible = true;
    }
  },
  methods: {
    getList (event) {
      this.params = {...event};
      this.getAdminAllBlogList();
    },
    clickItemRow(item) {
      this.itemData = item
      this.itemDataSee = !this.itemDataSee
      // console.log(item);
    },
    adminSilginBlog,
    adminBlogDelete,
    editBlog (id) {
      this.dialogVisible = !this.dialogVisible
      this.$router.push({name: this.$route.name, query: {item: id.id}})
      // console.log(this.$refs.updateItetmdata)
    },
    deleteBlog(id) {
      this.tableLoading = !this.tableLoading
      this.adminBlogDelete(id)
        .then(res => {
          console.log(res)
          this.getAdminAllBlogList()
        }).finally(() => {
        this.tableLoading = !this.tableLoading
      })
    },

    dayjs,
    getAdminBlogAll,
    handleAddRole()
    {

      this.dialogVisible = !this.dialogVisible
      this.$store.dispatch('user/itemDataChanges',{titel:'', descriptions: '', avatar: ''})

    },
    ClearIcon (event) {
      console.log(event)
    },
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
