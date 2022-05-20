<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          password: ''
        }
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>

<template>
  <el-form>
    <el-row>
      <el-col :lg="10">
        <el-row>
          <el-col :lg="24">
            <el-form-item label="Старый пароль">
              <el-input v-model.trim="user.name" />
            </el-form-item>
          </el-col>
          <el-col :lg="24">
            <el-form-item label="Hовый пароль">
              <el-input v-model.trim="user.password" />
            </el-form-item>
          </el-col>
          <el-col :lg="24">
            <el-form-item label="Подтвердите новый пароль">
              <el-input v-model.trim="user.email" />
            </el-form-item>
          </el-col>
          <el-col :lg="24">
            <el-row>
              <el-form-item>
                <div class="buttuns-warapper">
                  <el-col :sm="24" :span="16" class="btn__full">
                    <el-button
                      class="profile__setting__btn btn__full"
                      icon="el-icon-document"
                      type="primary"
                      @click="submit"
                    >Сохранить изменения</el-button>
                  </el-col>
                  <el-col :sm="24" :lg="8" class="btn__full">
                    <el-button
                      class="profile__setting__btn btn__full__revert"
                      style="float: right"
                      icon="el-icon-circle-close"
                      type="danger"
                    >Отмена</el-button>
                  </el-col>
                </div>
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">
.buttuns-warapper {
  display: flex;
  justify-content: space-between;
}
.profile__setting__btn {
  font-family: "SF Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
}
@media (max-width: 444px) {
  .buttuns-warapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .btn__full {
    width: 100%;
  }
  .btn__full__revert {
    width: 100%;
    margin-top: 15px;
  }
}
</style>
