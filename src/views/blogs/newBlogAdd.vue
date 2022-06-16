<template>
  <div class="app-container">
    <div
      class="blog__box"
      style="background-color: white; padding: 20px"
    >
      <el-form
        ref="ruleForm"
        style="width: 60%"
        :rules="roles"
        :model="blogForm"
        autocomplete="on"
      >
        <div class="upload__wrapper">
          <div>
            <el-form-item
              label="Заголовок"
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
              label="Описание"
              prop="description"
            >
              <el-input
                v-model="blogForm.description"
                class="input__style textarea__style"
                type="textarea"
                :rows="3"
                placeholder="Please input"
              />
            </el-form-item>
          </div>

          <!--        <el-form-item-->
          <!--          label="Изображение"-->
          <!--          prop="avatar"-->
          <!--        >-->
          <div class="img_avatar_wrapper">
            <img
              v-if="avatar"
              width="180px"
              :src="url+blogForm.avatar"
              alt="avatar"
            >
            <el-upload
              ref="imageUpload"
              style="display: flex; justify-content: center"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-remove="handleRemove"
              :before-upload="handlePictureCardPreview"
            >
              <i class="el-icon-upload" />
            </el-upload>
          </div>
          <!--        </el-form-item>-->
          <div class="button_box">
            <el-button
              type="danger"
              class="danger__btn"
              icon="el-icon-close"
              @click="resetForm"
            >
              Cansel
            </el-button>
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              type="success"
              icon="el-icon-upload"
              class="success__btn"
              @click="submitForm"
            >
              Confirm
            </el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { blogCreate, adminDataUpadate,adminSilginBlog } from "@/api/admin";
import { Default } from "@/validators/validators";

export default {
  data() {
    const defaults = Default;
    return {
      url: process.env.VUE_APP_BASE_API,
      blogForm: {
        title: "",
        description: "",
        avatar: "",
      },
      fullscreenLoading: false,
      avatar: false,
      roles: {
        title: [{ required: true, trigger: "change", validator: defaults }],
        description: [
          { required: true, trigger: "change", validator: defaults },
        ],
        avatar: [{ required: true, trigger: "change", validator: defaults }],
      },
    };
  },
  mounted() {
    if(this.$route.params.id) {
this.adminSilginBlog(this.$route.params.id)
  .then(res => {
    const data = {
      title: res.post['title'],
      description: res.post['body'],
      avatar: res.post['image']
    }
    this.avatar = true;
    this.blogForm = {...data};
  })
    }
  },
  methods: {
    blogCreate,
    adminDataUpadate,
    adminSilginBlog,
    handlePictureCardPreview(event) {
      this.avatar = false;
      this.blogForm.avatar = event;
      this.$refs.imageUpload.$el.children[1].style.display = 'none'
    },
    submitForm: function() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.fullscreenLoading = true
        if (this.$route.params.id) {
          this.adminDataUpadate(this.blogForm, this.$route.params.id)
            .then(() => {
              this.$message({
                message: "Добавить нового администратора",
                type: 'success',
              })
              this.$router.push({name: 'Blog'})
            }).finally(() => {
            this.fullscreenLoading = false;
            this.dialogVisible = false;
            this.$emit('modalClose', false)
          })
        } else  {
          if(this.blogForm.avatar) {
            this.blogCreate(this.blogForm)
              .then(() => {
                this.$message({
                  message: "Добавить нового администратора",
                  type: 'success'
                })
                this.$router.push({name: 'Blog'})
              })
              .catch(() => {
                this.$message({
                  message: "Ошибка добавления нового администратора",
                  // type: 'success',
                  type: 'error'
                })
              })
              .finally(() => {
                this.fullscreenLoading = false;
              })
          } else  {
            this.$message({
              message: 'Пожалуйста, выберите изображение',
              type: 'info'
            })
            this.fullscreenLoading = false
          }
        }
        }
    });
},
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    handleRemove() {
      this.$refs.imageUpload.$el.children[1].style.display = ''
    },
  }
}
</script>

<style scoped lang="scss">
.diseplyNone {
  display: none;
}
.img_avatar_wrapper{
  max-width: 100%;
  display: flex;
  gap: 20px;
  margin-top: 40px;
  img {
    border-radius: 10px;
  }
}
.picture-card div {
  width: 610px !important;
}

.input__style {
  width: 100%;
}
.textarea__style {
  margin: 20px 0px 20px 0px;
}
.blog__box_title {
  background-color: white;
  color: #1f2c37;
  font-family: "SF Pro";
  font-weight: 400;
}
.button_box {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 700px) {
  .input__style {
    width: 100%;
  }
  .blog__box__inner {
    margin-top: 20px;
   background-color: white;
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
