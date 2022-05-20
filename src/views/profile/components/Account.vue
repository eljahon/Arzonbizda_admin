<script>
import Upload from '../../components-demo/avatar-upload'
export default {
  components: {
    Upload
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
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
      <el-col><Upload /></el-col>
      <el-col :lg="10">
        <el-row>
          <el-col :lg="24">
            <el-form-item class="form__label__style" label="Имя">
              <el-input v-model.trim="user.email" class="accaunt__input" />
            </el-form-item>
          </el-col>
          <el-col :lg="24">
            <el-form-item label="Фамилия" class="form__label__style">
              <el-input v-model.trim="user.email" class="accaunt__input" />
            </el-form-item>
          </el-col>
          <el-col :lg="24">
            <el-form-item
              class="form__label__style"
              label="Адрес электронной почты"
            >
              <el-input v-model.trim="user.email" class="accaunt__input" />
            </el-form-item>
          </el-col>
          <el-col :lg="24">
            <el-row>
              <el-form-item>
                <div class="buttuns-warapper">
                  <el-col :span="16" class="btn__full">
                    <el-button
                      class="profile__setting btn__full"
                      icon="el-icon-document"
                      type="primary"
                      @click="submit"
                    >Сохранить изменения</el-button>
                  </el-col>
                  <el-col :lg="8" class="btn__box btn__revert">
                    <el-button
                      class="profile__setting btn__full"
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
.btn__box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.profile__setting__btn {
  font-family: "SF Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
}
.accaunt__input {
  font-family: "Yandex Sans Display";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 40px;
  color: #242625;
}
.form__label__style {
  font-family: "Yandex Sans Display";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: #4a4d4d;
}
@media (max-width: 433px) {
  .buttuns-warapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .btn__revert {
    margin-top: 10px;
  }
  .btn__full {
    width: 100%;
  }
}
</style>
