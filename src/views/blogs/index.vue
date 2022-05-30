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
      border
      style="width: 100%; margin-top: 30px"
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
        label="Эл. адрес"
        prop="date"
      >
        <template slot-scope="scope">
          {{ dayjs(scope.date).format("DD.MM.YYYY") }}
        </template>
      </el-table-column>
      <el-table-column
        label="Роль"
        prop="role"
      />
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
    <el-dialog
      :visible.sync="dialogVisible"
      title="Добавить новый блог"
    >
      <NewBlogAdd />
    </el-dialog>
    <blog-card />
  </div>
</template>

<script>
import { getAdminBlogAll } from "@/api/userInfo";
import NewBlogAdd from "@/views/blogs/newBlogAdd";
import { getUserName } from "@/utils/auth";
import dayjs from "dayjs";
import BlogCard from "./blogCard.vue";
// imprt {adminCreate}
export default {
  components: {
    NewBlogAdd,
    BlogCard,
  },
  data() {
    return {
      blogList: [],
      dialogVisible: false,
      tableLoading: false,
      dialogType: false,
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
  created() {
    this.getAdminAllBlogList();
    // console.log(JSON.parse(getUserName()).role)
  },
  methods: {
    clickItemRow(item) {
      console.log(item);
    },
    editBlog(id) {
      console.log(id);
    },
    deleteBlog(id) {
      console.log(id);
    },
    dayjs,
    getAdminBlogAll,
    handleAddRole() {
      this.dialogVisible = true;
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
              };
            });
            console.log(res);
          })
          .finally(() => {
            this.tableLoading = false;
          });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
