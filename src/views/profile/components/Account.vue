<!--suppress ALL -->
<template>
  <el-row>
    <div style="margin-left: 20px">
      <el-col><Upload ref="avatar" /></el-col>
      <el-col
        :lg="14"
        style="margin-top: 20px"
      >
        <el-row>
          <el-col :lg="16">
            <el-row>
              <el-form
                ref="profilForm"
                :rules="roles"
                :model="ruleForm"
                autocomplete="on"
              >
                <el-col :lg="24">
                  <el-form-item
                    label="Имя"
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

                  <el-form-item
                    label="Адрес электронной почты"
                    prop="email"
                  >
                    <el-input v-model.trim="ruleForm.email" />
                  </el-form-item>
                </el-col>
                <el-col :lg="24">
                  <el-row>
                    <!--                        <div class="buttuns-warapper">-->
                    <el-col
                      :sm="24"
                      :lg="16"
                      :md="16"
                      :xs="16"
                      class="btn__full"
                    >
                      <el-button
                        v-loading.fullscreen.lock="fullscreenLoading"
                        class="profile__setting__btn btn__full"
                        icon="el-icon-document"
                        type="primary"
                        @click.native.prevent="submitForm"
                      >
                        Сохранить изменения
                      </el-button>
                    </el-col>
                    <el-col
                      :sm="24"
                      :md="6"
                      :lg="8"
                      :xs="6"
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
                    <!--                        </div>-->
                  </el-row>
                </el-col>
              </el-form>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </div>
  </el-row>
</template>
<script>
import Upload from '../../components-demo/avatar-upload'
import { userPersolnData, userPersolnUpdate} from '@/api/userInfo'
import { adminDataUpadate } from '@/api/admin'
import { Default, Email } from '@/validators/validators'
import {getUserName, setUserName} from '@/utils/auth'

export default {
  components: {
    Upload
  },
  data() {
    return {
      ruleForm: {
        first_name: '',
        last_name: '',
        email: ''
      },
      avatar: '',
      userAdminId: '',
      fullscreenLoading: false,
      roles: {
        first_name: [{ required: true, trigger: 'change', validator: Default }],
        last_name: [{ required: true, trigger: 'change', validator: Default }],
        email: [{ required: true, trigger: 'change', validator: Email }]
      }
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    Default, Email,
    adminDataUpadate,
    userPersolnUpdate,
    submitForm() {
      this.$refs.profilForm.validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.fullscreenLoading= true
          this.userPersolnUpdate(this.ruleForm, JSON.parse(getUserName()).id)
            .then(() => {
              this.$message({
                message: "Ваша личная информация обновлена",
                type: 'success',
              })
              this.getUserInfo()
              this.resetForm();
              window.location.reload()
            })
            .catch(() => {
              this.$message({
                message: "Ваша личная информация будет обновлена",
                type: 'Warning',
              })
            })
            .finally(() => {
              this.fullscreenLoading = false
            })
          // console.log(this.ruleForm)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.profilForm.resetFields();
      this.$refs.avatar._data.imageUrl = ''
    },
    userPersolnData,
    getUserInfo () {
      this.userPersolnData()
        .then(res => {
          this.ruleForm = {
            first_name: res.admin.first_name,
            last_name: res.admin.last_name,
            email: res.admin.email
          };
          this.$refs.avatar._data.imageUrl = process.env.VUE_APP_BASE_API+res.admin.avatar
          setUserName(res.admin)
          this.$store.dispatch("user/setUserNewData", res.admin)
          // this.$router.push({name: this.$route.name, query:{ userId: res.admin.id }})
        }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>
<style scoped lang="scss">
.buttuns-warapper {
  width: 100%;
  display: flex;
}
</style>
