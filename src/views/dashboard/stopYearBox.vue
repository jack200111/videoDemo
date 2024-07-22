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
    setOptions({ columns_time, columns_out, rows } = {}) {
      this.chart.setOption({
        xAxis: {
          name: "时间",
          type: "category",
          data: rows,
          axisLabel: {
            interval: 0,
            formatter: "{value}", // 保留原始值
          },
          axisTick: {
            show: false // 设置为false，隐藏刻度线
          }
        },
        grid: {
          left: 20,
          right: 40,
          bottom: 40,
          top: 50,
          containLabel: true
        },
        yAxis: {
          name: "次",
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
          // formatter: (params) => {
          //   var tooltipString = '<div class="echarts-tooltip">'; // 使用类名 'echarts-tooltip'
          //   tooltipString += params[0].name + "点<br/>";
          //   params.forEach((item) => {
          //     tooltipString +=
          //       '<div class="echarts-tooltip-item">' +
          //       '<span class="echarts-tooltip-marker" style="background-color:' +
          //       item.color +
          //       '"></span>' +
          //       '<span class="echarts-tooltip-name">' +
          //       item.seriesName +
          //       "</span>" +
          //       '<span class="echarts-tooltip-value">' +
          //       item.value +
          //       "次</span>" +
          //       "</div>";
          //   });
          //   tooltipString += "</div>";
          //   return tooltipString;
          // },
          // formatter: '{a0}: {c0}<br />{a1}: {c1}'
        },
        series: [
          {
            name: "本年车次",
            data: columns_time,
            type: "bar",
            itemStyle: {
              color: '#9fe080' // 设置条形图颜色
            },
            label: {
              normal: {
                show: true, // true
                position: 'top',
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
