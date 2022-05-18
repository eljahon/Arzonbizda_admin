<template>
  <div class="panel-group">
    <el-col :xs="12" :sm="12" :lg="24" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-description">
          <div class="card-panel-text">Продукты</div>
          <count-to
            :start-val="0"
            :end-val="102400"
            :duration="2600"
            class="card-panel-num"
          />
          <p class="panelGroup__description">По сравнению с прошлым месяцем</p>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="24" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-description">
          <div class="card-panel-text">Количество посещений</div>
          <count-to
            :start-val="0"
            :end-val="81212"
            :duration="3000"
            class="card-panel-num"
          />
          <p class="panelGroup__description">По сравнению с прошлым месяцем</p>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panelGroup__description {
  font-family: "Yandex Sans Display";
  color: #afb3b3;
  font-style: normal;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
.panel-group {
  margin-top: 116px;
  .card-panel-col {
    margin: 0px 40px 32px 0px;
  }

  .card-panel {
    height: 200px;
    width: 200px;
    padding: 20px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      display: block;
      justify-content: center;
      font-weight: bold;
      margin-left: 0;

      .card-panel-text {
        font-family: "Yandex Sans Display";
        margin-top: 7px;
        text-align: center;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
      }

      .card-panel-num {
        font-family: "Yandex Sans Display";
        font-size: 40px;
        line-height: 48px;
        display: block;
        text-align: center;
        margin-top: 10px;
        color: #0f6cb0;
      }
    }
  }
}
@media (max-width: 1207px) {
  .panel-group {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
  }
}
@media (min-width: 1199.5px) and (max-width: 1207px) {
  .panel-group {
    margin-left: 700px;
  }
}
@media (max-width: 706px) {
  .panel-group {
    flex-direction: column;
  }
}
@media (max-width: 425px) {
  .panel-group {
    margin-right: 50px;
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
