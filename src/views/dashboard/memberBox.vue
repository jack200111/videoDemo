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
      default: '160px'
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
    setOptions({ man, woman } = {}) {
      // this.chart.showLoading();
      // this.chart.resize({
      //   width: 340 * 0.9,
      //   height: parseInt(this.height) * 0.9 // 1.1
      // });
      this.chart.setOption({
        grid: {
          left: 30,
          right: 40,
          bottom: 80,
          top: 80,
          containLabel: true
        },
        legend: {
          bottom: "-2%",
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
            name: "性别",
            type: "pie",
            radius: ["15%", "60%"],
            // center: ["50%", "45%"], // 调整这里的值，将环形图向上移动
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 5,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: true,
              position: "outside", // 将label显示在外部
              formatter: "{c}", // {b} : {c} ({d}%)显示名称、数值和百分比
              fontSize: 14, // 设置默认字体大小
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 22, // 根据需要调整字体大小
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
              length: 10, // 调整label线的长度
            },
            data: [
              { value: man, name: "男性" },
              { value: woman, name: "女性" },
            ],
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
