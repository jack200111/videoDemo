<template>
  <div :id="refname" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
// require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    refname: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
        this.chart.hideLoading();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el) //, 'macarons'
      this.setOptions(this.chartData)
    },
    setOptions({ columns_in, columns_out, rows } = {}) {
      // this.chart.showLoading();
      this.chart.setOption({
        yAxis: {
          name: "位置", // 将原先的 x 轴配置移到 yAxis
          type: "category",
          data: rows,
          axisLabel: {
            interval: 0,
            formatter: "{value}", // 保留原始值
          },
          axisTick: {
            show: false // 设置为 false，隐藏刻度线
          }
        },
        grid: {
          left: 20,
          right: 40,
          bottom: 40,
          top: 50,
          containLabel: true
        },
        xAxis: {
          name: "次", // 将原先的 y 轴配置移到 xAxis
          type: "value",
          // max: 1
        },
        legend: {
          bottom: "3%",
          left: "center",
        },
        tooltip: {
          // 配置 tooltip
          trigger: "axis", // 指定触发类型为坐标轴
          axisPointer: {
            // 坐标轴指示器配置
            type: "shadow", // 配置为阴影显示
            label: {
              show: false, // 显示坐标轴指示器标签
              fontSize: 16, // 字体大小
            },
          },
        },
        series: [
          {
            name: "进场",
            // data: [],
            data: columns_in,
            type: "bar",
            label: {
              normal: {
                show: true, // true
                // position: 'top',
                position: 'right',
                formatter: (param) => {
                  return param.value === 0 ? '' : param.value
                },
                textStyle: {
                  // color: '#5470c6', // rgba(22, 207, 208, 0.8)
                  // color: '#fff',
                  fontSize: 12,
                },
              },
            },
          },
          {
            name: "离场",
            // data: [],
            data: columns_out,
            type: "bar",
            label: {
              normal: {
                show: true, // true
                position: 'right',
                formatter: (param) => {
                  return param.value === 0 ? '' : param.value
                },
                textStyle: {
                  // color: '#5470c6', // rgba(22, 207, 208, 0.8)
                  // color: '#fff',
                  fontSize: 12,
                },
              },
            },
          },
        ],
      })
      // this.chart.hideLoading();
    },
    setLoading() {
      var chartDom = document.getElementById(this.refname);
      this.chart = echarts.init(chartDom);
      this.chart.showLoading();
    },
  }
}
</script>
