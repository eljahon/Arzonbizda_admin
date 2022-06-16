<template>
  <div>
    <!-- <input type="file"></input> -->
    <el-upload
      ref="imageSlects"
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="handelChanges"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img
        width="100%"
        :src="dialogImageUrl"
        alt=""
      >
    </el-dialog>
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
    };
  },
  methods: {
    avatarUpload,
    handleRemove() {

      this.$refs.imageSlects.$el.children[1].classList.remove('diseplyNone')
    },
    handlePictureCardPreview(file) {

      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handelChanges(event) {
       this.avatarUpload (event)
        .then((res) => {
          if(res.ok) {
            this.$message ({
            message: 'пользователь новый img добавить',
            type: 'success'
          });
           this.$refs.imageSlects.$el.children[1].classList.add('diseplyNone');
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
</style>
