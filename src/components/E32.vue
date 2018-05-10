<template>
  <div>
    <svg id="e32"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'e32',
    data() {
      return {
        options: {}
      }
    },
    mounted() {
//      let data = [1, 3, 5, 9, 3, 2]
      let data = [
        {name: 'A', value: 1},
        {name: 'B', value: 3},
        {name: 'C', value: 5},
        {name: 'D', value: 9},
        {name: 'E', value: 3},
        {name: 'F', value: 2},
        {name: 'G', value: 6},
        {name: 'H', value: 8},
        {name: 'I', value: 3},
        {name: 'J', value: 10},
        {name: 'K', value: 5},
        {name: 'L', value: 2},
        {name: 'M', value: 6},
        {name: 'N', value: 8},
        {name: 'O', value: 3},
        {name: 'P', value: 10},
        {name: 'Q', value: 5}
      ]

      let chart = d3.select('#e32')
      this.update(chart, data, document.querySelector('#e32').parentNode.offsetWidth)
      window.onresize = () => {
        this.update(chart, data, document.querySelector('#e32').parentNode.offsetWidth)
      }
    },
    methods: {
      update(chart, data, width = 600, height = 400) {
        let barWidth = width / data.length
        let y = d3.scaleLinear()
          .domain([0, d3.max(data.map(item => item.value))])
          .range([height, 0])
        let x = d3.scaleBand()
          .domain(data.map(item => item.name))
          .range([0, width])

        let bar = chart.selectAll('g')
          .data(data)

        bar.enter()
          .append('g')
          .attr('transform', (d, i) => `translate(${i * barWidth}, 0)`)
          .merge(bar)
        bar.exit().remove()

        chart.attr('width', width + 40)
          .attr('height', height + 40).append('g')
          .attr('transform', 'translate(20,20)')

        bar.append('rect')
          .attr('y', height)
          .attr('height', 0)
          .attr('width', barWidth - 1)
          .transition('ease')
          .attr('y', d => y(d.value))
          .attr('height', d => height - y(d.value))

        bar.append('text')
          .attr('x', x.step() / 2)
          .attr('y', d => y(d.value) + 3)
          .attr('dy', '.75em')
          .text(d => d.value)

        chart.append('g')
          .attr('class', 'x axis')
          .attr('transform', `translate(0, ${height})`)
          .call(d3.axisBottom(x))

        chart.append('g')
          .attr('class', 'x axis')
          .attr('transform', `translate(0, 0)`)
          .call(d3.axisLeft(y))
        bar.exit().remove()
      }
    }
  }
</script>

<style>
  #e32 rect {
    fill: steelblue;
  }

  #e32 text {
    fill: white;
    font: 10px sans-serif;
    text-anchor: end;
  }

  #e32 .axis text {
    font: 10px sans-serif;
    fill: #000;
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }
</style>
