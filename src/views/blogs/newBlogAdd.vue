<template>
  <div class="blog__box">
    <el-form
      ref="ruleForm"
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
              :rows="1"
              placeholder="Please input"
            />
          </el-form-item>
        </div>
        <el-form-item
          label="Изображение"
          prop="avatar"
        >
          <div class="img_avatar_wrapper">
            <img
              v-if="$route.query.item"
              width="180px"
              :src="blogForm.avatar"
              alt="avatar"
            >
            <el-upload
              style="display: flex; justify-content: center"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-change="handlePictureCardPreview"
            >
              <i class="el-icon-upload" />
            </el-upload>
          </div>
        </el-form-item>
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
</template>

<script>
import { blogCreate, adminDataUpadate } from "@/api/admin";
import { Default } from "@/validators/validators";
import {mapGetters} from "vuex";

export default {
  name: "NewBlogAdd",
  data() {
    const defaults = Default;
    return {
      blogForm: {
        title: "",
        description: "",
        avatar: "",
      },
      fullscreenLoading: false,
      roles: {
        title: [{ required: true, trigger: "change", validator: defaults }],
        description: [
          { required: true, trigger: "change", validator: defaults },
        ],
        avatar: [{ required: true, trigger: "change", validator: defaults }],
      },
    };
  },
  methods: {
    blogCreate,
    adminDataUpadate,
    handlePictureCardPreview(event) {
      console.log(event.raw)
      this.blogForm.avatar = event.raw
    },
    submitForm: function() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.fullscreenLoading = true
        if (this.$route.query.item) {
          this.adminDataUpadate(this.blogForm, this.$route.query.item)
            .then(() => {
              this.$notify({
                title: 'Успех',
                message: "Добавить нового администратора",
                type: 'success',
                // type: 'error',
                duration: 2000
              })
              this.$emit('handleAddRole')
              this.$emit('getBlogAllList')
            }).finally(() => {
            this.fullscreenLoading = false;
            this.dialogVisible = false;
            this.$emit('modalClose', false)
          })
        } else  {
          this.blogCreate(this.blogForm)
            .then(() => {
              this.$message({
                message: "Добавить нового администратора",
                type: 'success'
              })
              this.$emit('handleAddRole')
              this.$emit('getBlogAllList')
            })
            .catch(err => {
              console.log(err)
              this.$message({
                message: "Ошибка добавления нового администратора",
                // type: 'success',
                type: 'error'
              })
            })
            .finally(() => {
              this.fullscreenLoading = false;
              this.dialogVisible = false;
              this.$emit('modalClose', false)
            })
        }
        }
    });
},
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  },
  computed: {
    ...mapGetters(['itemBlog']),
    updateItemData: function () {
      return this.itemBlog
    }
  },
  watch: {
    updateItemData: function (val) {
      this.blogForm = val
    },
  }
}
</script>

<style scoped lang="scss">
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
