
<template>
  <el-row>
    <el-col :lg="10">
      <el-row>
        <el-form
          ref="ruleForm"
          :rules="roles"
          :model="ruleForm"
          autocomplete="on"
        >
          <el-col :lg="24">
            <el-form-item
              label="Старый пароль"
              prop="oldpassowrd"
            >
              <el-input v-model.trim="ruleForm.oldpassowrd" />
            </el-form-item>
          </el-col>
          <el-col :lg="24">
            <el-form-item
              label="Hовый пароль"
              prop="newpassword"
            >
              <el-input v-model.trim="ruleForm.newpassword" />
            </el-form-item>
          </el-col>
          <el-col :lg="24">
            <el-form-item
              label="Подтвердите новый пароль"
              prop="congirmpassword"
            >
              <el-input v-model.trim="ruleForm.congirmpassword" />
            </el-form-item>
          </el-col>
          <el-col :lg="24">
            <el-row>
              <el-form-item>
                <div class="buttuns-warapper">
                  <el-col
                    :sm="24"
                    :span="16"
                    class="btn__full"
                  >
                    <el-button
                      v-loading.fullscreen.lock="fullscreenLoading"
                      class="profile__setting__btn btn__full"
                      icon="el-icon-document"
                      type="primary"
                      @click="submitForm"
                    >
                      Сохранить изменения
                    </el-button>
                  </el-col>
                  <el-col
                    :sm="24"
                    :lg="8"
                    class="btn__full"
                  >
                    <el-button
                      class="profile__setting__btn btn__full__revert"
                      style="float: right"
                      icon="el-icon-circle-close"
                      type="danger"
                      @click="resetForm"
                    >
                      Отмена
                    </el-button>
                  </el-col>
                </div>
              </el-form-item>
            </el-row>
          </el-col>
        </el-form>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import {Default} from "@/validators/validators"
import {adminPasswordUpadate} from "@/api/admin"
import {getUserName} from "@/utils/auth";
export default {
  data: function() {
    return {
      fullscreenLoading: false,
      ruleForm: {
        oldpassowrd: '',
        newpassword: '',
        congirmpassword: ''
      },
      roles: {
        oldpassowrd: [{ required: true, trigger: 'blur', validator: Default }],
        newpassword: [{ required: true, trigger: 'blur', validator: Default }],
        congirmpassword: [{ required: true, trigger: 'blur', validator: Default }]
      }
    }
  },
  mounted() {
  },
  methods: {
    adminPasswordUpadate,
    setAdminDataPassword (data, id) {
      this.fullscreenLoading = true
      this.adminPasswordUpadate(data, id)
        .then(() => {
          this.$message({
            message: "Ваша личная информация обновлена",
            type: 'success',
          })
        }).catch(() => {
        this.$message({
          message: "Ваша личная информация будет обновлена",
          // type: 'success',
          type: 'Warning'
        })
      }).finally(() => {
        this.fullscreenLoading = false
      })
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if(this.checkOldAndNewPassword(this.ruleForm.newpassword, this.ruleForm.congirmpassword)) {
            // console.log(this.ruleForm)
            const data  = {
              password: this.ruleForm.oldpassowrd,
              newpassword: this.ruleForm.newpassword
            };
            this.setAdminDataPassword(data, JSON.parse(getUserName()).id)
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    checkOldAndNewPassword (congirmPassword, newPassword) {
      if (congirmPassword === newPassword) return true;
      else  {
        this.$notify({
          title: 'Информация',
          message: "Извините,новый пароль и повторяющийся пароль не совпадают",
          type: 'Info',
          // type: 'error',
          duration: 2000,
          offset: 100
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.buttuns-warapper {
  display: flex;
  justify-content: space-between;
}
.profile__setting__btn {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
}
@media (max-width: 444px) {
  .btn__full {
    width: 100%;
  }
  .btn__full__revert {
    width: 100%;
    margin-top: 15px;
  }
}
</style>
