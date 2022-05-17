<template>
  <el-card class="box-card-component">
    <h3>Популярные локации</h3>
    <el-tabs v-model="activeTab">
      <el-tab-pane class="panel_Provinces" label="Провинции" name="Провинции">
        <div style="padding-top: 35px" class="progress-item">
          <span>Узбекистан</span>
          <el-progress :stroke-width="10" :percentage="70" />
        </div>
        <div class="progress-item">
          <span>Кыргызстан</span>
          <el-progress :stroke-width="10" :percentage="18" />
        </div>
      </el-tab-pane>
      <el-tab-pane class="panel_Provinces" label="Страны" name="Страны">
        <div style="position: relative">
          <div style="padding-top: 35px" class="progress-item">
            <span>Узбекистан</span>
            <el-progress :stroke-width="10" :percentage="70" />
          </div>
          <div class="progress-item">
            <span>Кыргызстан</span>
            <el-progress :stroke-width="10" :percentage="18" />
          </div>
          <div class="progress-item">
            <span>Таджикистан</span>
            <el-progress :stroke-width="10" :percentage="12" />
          </div>
          <div class="progress-item">
            <span>Туркменистан</span>
            <el-progress :stroke-width="10" :percentage="100" />
          </div>
          <div class="progress-item">
            <span>Казахстан</span>
            <el-progress :stroke-width="10" :percentage="100" />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      activeTab: 'Страны',
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'roles'])
  }
}
</script>

<style lang="scss">
.el-tabs__active-bar {
  background-color: #ff3838 !important;
}
.el-tabs__item.is-active {
  color: #ff3838 !important;
}

.panel_Provinces {
  font-family: "Yandex Sans Display";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  span {
    font-family: "Yandex Sans Display";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
  }
}
.box-card-component {
  margin-left: 50px;
  margin-top: 116px;
  width: 320px;
  .el-card__header {
    padding: 0 !important;
  }
  h3 {
    font-family: "Yandex Sans Display";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;

    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;

      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }

  .mallki-text {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
    font-weight: bold;
  }

  .panThumb {
    z-index: 100;
    height: 70px !important;
    width: 70px !important;
    position: absolute !important;
    top: -45px;
    left: 0;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none !important;

    ::v-deep .pan-info {
      box-shadow: none !important;
    }
  }

  .progress-item {
    margin-bottom: 15px;
    font-size: 14px;
  }

  @media only screen and (max-width: 1510px) {
    .mallki-text {
      display: none;
    }
  }
  @media (max-width: 1320px) {
    .box-card-component {
      margin-left: 50px;
      margin-top: 116px;
      width: 280px;
    }
  }
}
</style>
