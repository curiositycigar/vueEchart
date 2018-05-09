<template>
  <div>
    <div :style="{width:width,height:height}" :ref="name"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import 'echarts-gl'

  export default {
    name: 'echart',
    data() {
      return {
        chart: null
      }
    },
    props: {
      options: {
        type: Object,
        default() {
          return {}
        }
      },
      name: {
        type: String,
        default: 'echart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '400px'
      }
    },
    watch: {
      width() {
        this.initChart(this.options)
      },
      height() {
        this.initChart(this.options)
      },
      options() {
        this.initChart(this.options)
      }
    },
    mounted() {
      this.chart = echarts.init(this.$refs[this.name])
      this.initChart(this.options)
      window.addEventListener('resize', () => {
        this.chart.resize()
      })
    },
    methods: {
      initChart(options) {
        this.chart.setOption(options)
      }
    }
  }
</script>

<style scoped>

</style>
