<script>
import dayjs from "dayjs";
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    dayjs
  }
};
</script>
<template>
  <div class="cars_wrapper">
    <div class="grid__card">
      <div class="grid__items">
        <div class="card__image__box">
          <img
            class="card__image"
            :src="item.image"
            alt="imggg"
          >
        </div>
        <h1 class="card__title">
          {{ item.title }}
        </h1>
        <p class="card__desc">
          {{ item.description }}
        </p>
        <div class="card__bottom__content">
          <div class="avatar__box">
            <img
              class="avatar__box__img"
              :src="item.image"
              alt="avatar"
            >
          </div>
          <div class="nameAndDate">
            <h4 class="card__fullname">
              {{ item.fist_name }} {{ item.last_name }}
            </h4>
            <div class="dots" />
            <h4 class="card__data">
              {{ dayjs(item.date).format("MM.DD.YYYY") }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.avatar__box {
  position: relative;
  width: 40px;
  height: 40px;
}
.card__bottom__content,
.nameAndDate {
  display: flex;
  align-items: center;
}
.dots {
  width: 4px;
  height: 4px;
  background-color: palevioletred;
  border-radius: 50%;
  margin-left: 10px;
}
.card__desc {
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
}
.card__desc,
.card__title {
  font-family: "Yandex Sans Display";
  color: #152035;
  transform: translateY(-32px);
}
.card__title {
  //   background: red;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  width: 340px !important;
  display: inline-block;
}
.card__title:hover {
  color: #f67280;
}
.card__fullname,
.card__data {
  margin-left: 10px;
  font-family: "Yandex Sans Display";
  font-weight: 400;
}
.avatar__box__img {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.grid__card {
  //margin-top: 30px
}
.grid__items {
  box-shadow: 0px 5px 20px 0px rgb(69 67 96 / 10%);
  background-color: #fff;
  border-radius: 20px;
  padding: 30px;
  margin: auto;
  width: 400px;
}
.card__image__box {
  position: relative;
  height: 252px;
    
  //   background: green;
  border-radius: 20px;
  transform: translateY(-50px);
}
.card__image {
  border-radius: 20px;
  position: absolute;
  width: 100%;
  height: 100%;
  transition: 0.7s ease;
  object-fit: cover;
}
.card__image__box:hover img {
  transform: scale(1.2);
}
</style>
