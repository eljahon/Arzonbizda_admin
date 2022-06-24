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
            <el-upload
              ref="imageSlects"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="handelChanges"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              />
            </el-upload>
          </div>
          <!--        </el-form-item>-->
          <div class="button_box">
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              type="primary"
              icon="el-icon-upload"
              class="success__btn"
              @click="submitForm"
            >
              Сохранить изменения
            </el-button>
            <el-button
              type="danger"
              class="danger__btn"
              icon="el-icon-close"
              @click="resetForm"
            >
              Отмена
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
      imageUrl: '',
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
    this.imageUrl =process.env.VUE_APP_BASE_API+res.post['image']
    this.blogForm = {...data};
  })
    }
  },
  methods: {
    blogCreate,
    adminDataUpadate,
    adminSilginBlog,
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handelChanges(event) {
      this.blogForm.avatar = event;
      if (event) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(event);
      }
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
      this.$refs.ruleForm.resetFields();
      this.imageUrl = ''
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  position: relative;
  top: -20px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 158px;
  display: block;
  margin-bottom: 15px;
}
</style>
