<template>
  <!--  -->
  <div :id="refname" :style="{ width: boxWidth, height: boxHeight + 'px', bottom: refname === 'memberNumBox' ? boxHeight * 0.02 + 'px' : boxHeight * 0.05 + 'px' }" />
</template>

<script>
import * as echarts from "echarts";
// import echarts from "echarts";

export default {
  props: {
    refname: {
      type: String,
      default: "",
    },
    chartres: {
      type: Object,
      default: () => ({})
    },
    boxWidth: {
      type: String,
      default: "100%", // 默认宽度，你可以根据需求更改
    },
    boxHeight: {
      type: Number,
      default: 150, // 默认高度，你可以根据需求更改
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      chart: null,
      // boxWidth: "100%"
    };
  },
  watch: {
  },
  mounted() {
    console.log("Component mounted");
    this.loading ? this.loadingSet() : this.normalSet()
    // this.normalSet()
  },
  methods: {
    loadingSet() {
      this.$nextTick(() => {
        var chartDom = document.getElementById(this.refname);
        this.chart = echarts.init(chartDom);
        // 监听属性的变化，并在变化时更新图表
        this.chart.showLoading();
        this.$watch('chartres', (newChartData) => {
          this.chart.resize({
            width: this.refname === 'memberNumBox' ? parseInt(this.boxWidth) * 1 : parseInt(this.boxWidth) * 1.05,
            height: this.refname === 'memberNumBox' ? this.boxHeight * 1 : this.boxHeight * 1.1
          });
          this.chart.hideLoading();
          this.chart.setOption(newChartData);
        }, { deep: true });
        this.chart.resize({
          width: this.refname === 'memberNumBox' ? parseInt(this.boxWidth) * 1 : parseInt(this.boxWidth) * 1.05,
          height: this.refname === 'memberNumBox' ? this.boxHeight * 1 : this.boxHeight * 1.1 // 1.1
        });
        this.chartres && this.chart.setOption(this.chartres);
        // this.chart.hideLoading();
      });
    },
    normalSet() {
      this.$nextTick(() => {
        var chartDom = document.getElementById(this.refname);
        this.chart = echarts.init(chartDom);
        // 监听属性的变化，并在变化时更新图表
        this.$watch('chartres', (newChartData) => {
          // this.chart.resize({
          //   width: this.refname === 'memberNumBox' ? this.boxWidth * 1 : this.boxWidth * 1.0,
          //   height: this.refname === 'memberNumBox' ? this.boxHeight * 1 : this.boxHeight * 1.1
          // });
          this.chart.setOption(newChartData);
        }, { deep: true });
        // this.chart.resize({
        //   width: this.refname === 'memberNumBox' ? this.boxWidth * 1 : this.boxWidth * 1.0,
        //   height: this.refname === 'memberNumBox' ? this.boxHeight * 1 : this.boxHeight * 1.1
        // });
        this.chartres && this.chart.setOption(this.chartres);
      });
    },
    setLoading() {
      var chartDom = document.getElementById(this.refname);
      this.chart = echarts.init(chartDom);
      this.chart.showLoading();
    },
    hiddenLoading() {
      this.chart.hideLoading();
    },
    setDate() {
      this.chart.setOption(this.chartres);
      this.chart.hideLoading();
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
.echarts-tooltip{
  .echarts-tooltip-item{
    display: flex;
    align-items: center;
    margin-top: 5px;
    .echarts-tooltip-marker{
      width: 15px;
      height: 15px;
      display: inline-block;
      border-radius: 50%;
      margin-right: 6px;
    }
    .echarts-tooltip-name{
      margin-right: 25px;
    }
    .echarts-tooltip-value{
      font-weight: 600;
    }
  }

}
#memberNumBox{
  // position: relative;
  // bottom: 15px !important;
  left: -60px;
}
.pos{
  position: relative;
}
</style>
