<script>
// import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import BoxCard from './components/BoxCard'
import LineChart from './components/LineChart.vue'

const lineChartData = {
  newVisitis: {
    // expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    // expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    // expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    // expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    PanelGroup,
    BoxCard,
    LineChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>
<template>
  <div class="dashboard-editor-container">
    <el-row class="all-components-flex">
      <el-col class="panel__box" :xs="24" :sm="24" :lg="5">
        <panel-group @handleSetLineChartData="handleSetLineChartData" />
      </el-col>
      <el-col class="chart__Box">
        <el-row class="chart-wrapper">
          <div>
            <line-chart :chart-data="lineChartData" />
          </div>
        </el-row>
      </el-col>
      <el-col
        class="box-card__Box"
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 8 }"
        :xl="{ span: 6 }"
      >
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.all-components-flex {
  display: flex;
  padding: 0px 40px;
}
.dashboard-editor-container {
  background-color: rgb(240, 242, 245);
  position: relative;
  min-height: 100vh;
  .github-corner {
    position: absolute;
    top: 0;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    margin-top: 20px;
    margin-left: 8px;
    width: 100%;
    height: 433px;
    margin-top: 116px;
  }
}

@media (max-width: 1286px) {
  .chart-wrapper {
    margin-left: 25px !important;
  }
}
@media (max-width: 1207px) {
  .all-components-flex {
    flex-direction: column;
    padding: 0px 40px;
  }
  .panel__box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .chart-wrapper {
    margin-left: 8px;
    margin-top: 40px !important;
  }
  .chart__Box {
    margin-left: -25px;
  }
  .box-card__Box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
