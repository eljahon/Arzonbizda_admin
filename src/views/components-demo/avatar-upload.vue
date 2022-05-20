<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import userImages from '../../assets/userImages.png'
export default {
  name: 'AvatarUploadDemo',
  components: { ImageCropper, PanThumb },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: userImages
    }
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>
<template>
  <div class="components-container">
    <!-- <aside>
      This is based on
      <a class="link-type" href="//github.com/dai-siki/vue-image-crop-upload">
        vue-image-crop-upload</a
      >. Since I was using only the vue@1 version, and it is not compatible with
      mockjs at the moment, I modified it myself, and if you are going to use
      it, it is better to use official version.
    </aside> -->

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
        @click="imagecropperShow = true"
      >
        Сбросить изображение
      </el-button>
    </div>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="https://httpbin.org/post"
      lang-type="en"
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
  font-family: "SF Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
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
