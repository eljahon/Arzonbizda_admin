<template>
  <div class="app-container">
    <el-button
      style="float: right; margin-bottom: 20px"
      type="primary"
      round
      icon="el-icon-plus"
      @click="handleAddRole"
    >
      Добавлен новый админ
    </el-button>

    <el-table
      v-loading="tableLoading"
      :data="adminList"
      border
      style="width: 100%;margin-top:30px;"
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
        label="Роль"
        prop="role"
      />
      <el-table-column
        label="Действия"
        align="center"
      >
        <el-button
          size="small"
          icon="el-icon-delete"
          type="danger"
        />
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType==='edit'?'Edit Role':'Добавлен новый админ'"
    >
      <el-form
        ref="ruleForm"
        :rules="roles"
        :model="ruleForm"
        autocomplete="on"
      >
        <el-col :lg="24">
          <el-form-item
            label="имя"
            prop="first_name"
          >
            <el-input v-model.trim="ruleForm.first_name" />
          </el-form-item>
        </el-col>
        <el-col :lg="24">
          <el-form-item
            label="Фамилия"
            prop="last_name"
          >
            <el-input v-model.trim="ruleForm.last_name" />
          </el-form-item>
        </el-col>
        <el-col :lg="24">
          <el-form-item
            label="Эл. адрес"
            prop="email"
          >
            <el-input v-model.trim="ruleForm.email" />
          </el-form-item>
        </el-col>
        <el-col :lg="24">
          <el-form-item
            label="Пароль"
            prop="password"
          >
            <el-input v-model.trim="ruleForm.password" />
          </el-form-item>
        </el-col>
      </el-form>
      <div style="text-align:right;">
        <el-button
          type="danger"
          @click="resetForm('ruleForm')"
        >
          Cancel
        </el-button>
        <el-button
          v-loading.fullscreen.lock="fullscreenLoading"
          type="primary"
          @click="submitForm('ruleForm')"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAdminAll } from '@/api/userInfo'
import { Default, Email } from '@/validators/validators'
import { adminCreate } from '@/api/admin'
// imprt {adminCreate}
export default {
  data() {
    const defaults = Default
    return {
      adminList: [],
      dialogVisible: false,
      fullscreenLoading: false,
      tableLoading: false,
      dialogType: false,
      ruleForm: {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      },
      roles: {
        first_name: [{ required: true, trigger: 'change', validator: defaults }],
        last_name: [{ required: true, trigger: 'change', validator: defaults}],
        email: [{ required: true, trigger: 'change', validator: Email }],
        password: [{ required: true, trigger: 'change', validator: defaults }]
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    this.getAdminAllList()
  },
  methods: {
    getAdminAll,
    adminCreate,
    submitForm: function() {
      this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.fullscreenLoading = true
            this.adminCreate(this.ruleForm)
              .then(() => {
                this.$notify({
                  title: 'Успех',
                  message: "Добавить нового администратора",
                  type: 'success',
                  // type: 'error',
                  duration: 2000
                })
                this.getAdminAllList()
              })
              .catch(err => {
                console.log(err)
                this.$notify({
                  title: 'Ошибка',
                  message: "Ошибка добавления нового администратора",
                  // type: 'success',
                  type: 'error',
                  duration: 2000
                })
              })
              .finally(() => {
              this.fullscreenLoading = false
              this.dialogVisible = false
              })
            }
          else
            {
              console.log('error submit!!')
              return false
            }
          }
        )

        },
        resetForm(formName) {
          this.$refs[formName].resetFields()
        },
      handleAddRole()
      {
        this.dialogVisible = true

      },
    getAdminAllList () {
      this.tableLoading = true,
        this.getAdminAll()
          .then(res => {
            this.adminList = res.data.admins
            console.log(res)
          })
          .finally(() => {
            this.tableLoading = false
          })
    }
    }
  }
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
