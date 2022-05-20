<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import userImages from '../../assets/userImages.png'
import { getToken } from '@/utils/auth'
export default {
  name: 'AvatarUploadDemo',
  components: { ImageCropper, PanThumb },
  data: function() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: userImages,
      header: {
        'Authorization': getToken()
      }
    }
  },
  methods: {
    cropSuccess(resData) {
      console.log(resData)
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = process.env.VUE_APP_BASE_API + resData.src
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>
<template>
  <div class="components-container">
    <pan-thumb :image="image" />
    <div class="btns__box">
      <el-button
        class="profile__setting__btn btn__size__newImg__blue btn__full"
        type="primary"
        icon="el-icon-upload"
        @click="imagecropperShow = true"
      >
        Загрузить новое изображение
      </el-button>
      <el-button
        class="profile__setting__btn btn__size__newImg__green btn__full"
        type="primary"
        icon="el-icon-refresh"
      >
        Сбросить изображение
      </el-button>
    </div>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="600"
      :height="600"
      url="https://arzonbizda.herokuapp.com/admin/admin-avatar"
      lang-type="en"
      :headers="header"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<style scoped lang="scss">
.components-container {
  display: flex;
}
.profile__setting__btn {
  font-family: "SF Pro",serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
}

.profile__setting__btn {
  font-family: "SF Pro",serif;
}

.btn__size__newImg__blue {
  margin-top: 30px;
  width: 301px;
  height: 40px;
}
.btn__size__newImg__green {
  margin-top: 30px;
  width: 248px;
  height: 40px;
  background-color: #ff3838;
  border: none;
}
.btns__box {
  display: flex;
  margin-left: 10px;
}
@media (max-width: 871px) {
  .btn__size__newImg__blue {
    margin-top: 20px;
    width: 200px;
    height: 30px;
    font-size: 12px;
    line-height: 16px;
  }
  .btn__size__newImg__green {
    margin-top: 20px;
    width: 200px;
    height: 30px;
    font-size: 12px;
    line-height: 16px;
  }
  .el-button--medium {
    padding: 6px;
  }
}
@media (max-width: 700px) {
  .btns__box {
    flex-direction: column;
    margin-left: 10px;
  }
  .el-button--medium {
    padding: 10px 20px;
  }
  .btn__size__newImg__blue,
  .btn__size__newImg__green {
    margin-top: 10px;
    width: 301px;
    height: 40px;
    font-size: 16px;
    line-height: 16px;
    margin-left: 6px;
  }
}
@media (max-width: 624px) {
  .components-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  .btn__size__newImg__blue,
  .btn__size__newImg__green {
    margin-left: -8px;
  }
  .btn__full {
    width: 100%;
  }
}
@media (max-width: 400px) {
  .btn__size__newImg__blue,
  .btn__size__newImg__green {
    font-size: 12px;
  }
}
</style>
