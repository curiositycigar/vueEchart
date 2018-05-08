<template>
  <div>
    <e-chart name="chart" :options="options"/>
  </div>
</template>

<script>
  import EChart from './EChart'

  export default {
    name: 'e11',
    components: {
      EChart
    },
    data() {
      return {
        width: '100px',
        options: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        }
      }
    },
    mounted() {
      window.setInterval(() => {
        this.options = {
          title: {
            left: 'center',
            text: '基础折线统计图'
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [
              278,
              (Math.floor(Math.random() * 600) + 200),
              (Math.floor(Math.random() * 600) + 200),
              (Math.floor(Math.random() * 600) + 200),
              (Math.floor(Math.random() * 600) + 200),
              (Math.floor(Math.random() * 600) + 200),
              878
            ],
            type: 'line'
          }]
        }
      }, 1000)
    },
    methods: {}
  }
</script>

<style scoped>

</style>
