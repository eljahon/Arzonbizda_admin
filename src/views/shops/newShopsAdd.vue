<template>
  <div class="blog__box">
    <el-form
      ref="ruleForm"
      :rules="roles"
      :model="blogForm"
      autocomplete="on"
    >
      <el-form-item
        label="изображение"
        prop="avatar"
      >
        <el-upload
          style="display: flex; justify-content: center"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-change="handlePictureCardPreview"
        >
          <i class="el-icon-upload" />
        </el-upload>
      </el-form-item>
      <div class="upload__wrapper">
        <div>
          <el-form-item
            label="ссылк"
            prop="title"
          >
            <el-input
              v-model="blogForm.title"
              class="input__style"
              placeholder="Please input"
            />
          </el-form-item>
        </div>
        <div>
          <el-form-item
            label="Название магазина"
            prop="description"
          >
            <el-input
              v-model="blogForm.description"
              class="input__style textarea__style"
              placeholder="Please input"
            />
          </el-form-item>
        </div>
        <div class="button_box">
          <el-button
            type="danger"
            class="danger__btn"
            icon="el-icon-close"
            @click="resetForm"
          >
            Кансел
          </el-button>
          <el-button
            v-loading.fullscreen.lock="fullscreenLoading"
            type="success"
            icon="el-icon-upload"
            class="success__btn"
            @click="submitForm"
          >
            Подтверждать
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { blogCreate } from '@/api/admin'
import { Default } from '@/validators/validators'

export default {
  name: "NewBlogAdd",
  data () {
    const defaults = Default
    return {
      blogForm: {
        title: '',
        description: '',
        avatar: ''
      },
      fullscreenLoading: false,
      roles: {
        title: [{ required: true, trigger: 'change', validator: defaults }],
        description: [{ required: true, trigger: 'change', validator: defaults}],
        avatar: [{ required: true, trigger: 'change', validator: defaults }],}
    }
  },
  methods: {
    blogCreate,
    handlePictureCardPreview(event) {
      console.log(event.raw)
      this.blogForm.avatar = event.raw
    },
    submitForm: function() {
      this.$refs.ruleForm.validate(valid => {
          if (valid) {
            // this.fullscreenLoading = true
            // this.blogCreate(this.blogForm)
            //   .then(res => {
            //     this.$notify({
            //       title: 'Успех',
            //       message: "Добавить нового администратора",
            //       type: 'success',
            //       // type: 'error',
            //       duration: 2000
            //     })
            //     this.$emit('openModal')
            //     this.$emit('getBlogAllList')
            //   })
            //   .catch(err => {
            //     console.log(err)
            //     this.$notify({
            //       title: 'Ошибка',
            //       message: "Ошибка добавления нового администратора",
            //       // type: 'success',
            //       type: 'error',
            //       duration: 2000
            //     })
            //   })
            //   .finally(() => {
            //     this.fullscreenLoading = false;
            //     this.dialogVisible = false;
            //     this.$emit('openModal')
            //   })
          }
          else
          {
            console.log('error submit!!')
            return false
          }
        }
      )

    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },  }
}
</script>

<style scoped lang="scss">
.picture-card div {
  width: 610px !important;
}
.blog__box {
//display: flex;
//flex-direction: column;
//justify-content: center;
//align-items: center;
}
.upload__wrapper {
}
.input__style {
  width: 100%;
}
.textarea__style {
  margin: 20px 0px 20px 0px;
}
.blog__box_title {
  color: #1f2c37;
  font-family: "SF Pro";
  font-weight: 400;
}
.button_box {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end
}

@media (max-width: 700px) {
  .input__style {
    width: 100%;
  }
  .blog__box__inner {
    margin-top: 20px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    padding: 20px;
    width: 100%;
    border-radius: 5px;
  }
}
@media (max-width: 500px) {
  .input__style {
    width: 100%;
  }
  .blog__box__inner {
    margin-top: 20px;
    width: 100%;
  }
  .blog__box_title {
    font-size: 22px;
  }
}
@media (max-width: 380px) {
  .input__style {
    width: 275px;
  }
  .blog__box__inner {
    margin-top: 20px;
    width: 100%;
  }
  .blog__box_title {
    font-size: 20px;
  }
}
</style>
