<template>
  <div>
    <!-- <input type="file"></input> -->
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
</template>
<script>
import {avatarUpload} from '@/api/admin'
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: true,
      imageUrl: ''
    };
  },
  methods: {
    avatarUpload,
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleRemove() {

      this.$refs.imageSlects.$el.children[1].classList.remove('diseplyNone')
    },
    handelChanges(event) {
      if (event) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(event);
      }
       this.avatarUpload (event)
        .then((res) => {
          if(res.ok) {
            this.$message ({
            message: 'пользователь новый img добавить',
            type: 'success'
          });
          }
        })
    //  }

    }
  }
}
</script>
<style>
.diseplyNone {
  display: none;
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
