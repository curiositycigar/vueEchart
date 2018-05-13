<template>
  <div>
    <svg id="e32"></svg>
    <svg id="e321"></svg>
    <div id="e322"></div>
  </div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'e32',
    data() {
      return {
        options: {},
        data: [
          {name: 'A', value: 1},
          {name: 'B', value: 3},
          {name: 'C', value: 5},
          {name: 'D', value: 9},
          {name: 'E', value: 3},
          {name: 'F', value: 2},
          {name: 'G', value: 6},
          {name: 'H', value: 8},
          {name: 'I', value: 3.4},
          {name: 'J', value: 10},
          {name: 'K', value: 5},
          {name: 'L', value: 2},
          {name: 'M', value: 6},
          {name: 'N', value: 8},
          {name: 'O', value: 3},
          {name: 'P', value: 10},
          {name: 'Q', value: 5}
        ]
      }
    },
    mounted() {
      let data = this.data

      let chart = d3.select('#e32')
      chart.append('g')
      this.update(chart, data)

      let strData = 'abcdefghijklmnopqrstuvwxyz'.split('')
      let str = d3.select('#e321')
      str.append('g')
      this.updateStr(str, strData)
//      d3.interval(() => {
//        this.updateStr(str, d3.shuffle(strData).slice(0, Math.random() * 26))
//      }, 1000)

      let data2 = [3, 7, 9, 1, 4, 6, 8, 2, 5]
      let w = 700
      let h = 300
      let max = d3.max(data2)

      let x = d3.scaleLinear().domain([0, data2.length - 1]).range([0, w])
      let y = d3.scaleLinear().domain([0, max]).range([h, 0])

      let vis = d3.select('#e322')
        .append('svg:svg')
        .attr('width', w)
        .attr('height', h)

      vis.selectAll('path.line')
        .data([data2])
        .enter().append('svg:path')
        .attr('fill', '#fff')
        .attr('stroke', '#000')
        .attr('d', d3.line()
          .x((d, i) => x(i))
          .y(y))

      let ticks = vis.selectAll('.tick')
        .data(y.ticks(7))
        .enter().append('svg:g')
        .attr('transform', (d) => `translate(0, ${y(d)})`)
        .attr('class', 'tick')

      ticks.append('svg:line')
        .attr('stroke', '#aaa')
        .attr('y1', 0)
        .attr('y2', 0)
        .attr('x1', 0)
        .attr('x2', w)

      ticks.append('svg:text')
        .style('color', '#aaa')
        .text((d) => d)
        .attr('text-anchor', 'end')
        .attr('dy', 2)
        .attr('dx', 4)

      window.d3 = d3
    },
    methods: {
      updateStr(chart, data, width = 600, height = 400) {
        let t = d3.transition().duration(700)
        chart.attr('width', width)
          .attr('height', height)
        let body = chart.select('g').attr('transform', `translate(32,${height / 2})`)
        let text = body.selectAll('text').data(data)

        text.exit()
          .attr('class', 'exit')
          .transition(t)
          .attr('y', 60)
          .style('fill-opacity', 1e-6)
          .remove()

        text.attr('class', 'update')
          .attr('y', 0)
          .style('fill-opacity', 1)
          .transition(t)
          .attr('x', (d, i) => i * 32)

        text.enter().append('text')
          .attr('class', 'enter')
          .attr('x', (d, i) => i * 32)
          .attr('y', -60)
          .attr('dy', '.35em')
          .text(d => d)
          .transition(t)
          .attr('y', 0)
      },
      update(wrapper, data, width = 600, height = 400) {
        let barWidth = width / data.length
        let y = d3.scaleLinear()
          .domain([0, d3.max(data.map(item => item.value))])
          .range([height, 0])
        let x = d3.scaleBand()
          .domain(data.map(item => item.name))
          .range([0, width])

        let chart = wrapper.attr('width', width + 40)
          .attr('height', height + 40).select('g')
          .attr('transform', 'translate(20,20)')

        let oldBar = chart.selectAll('g').data(data)

        oldBar.attr('class', 'update')

        let bar = oldBar.enter().append('g').attr('class', 'enter')
          .merge(oldBar)

        bar.attr('transform', (d, i) => `translate(${i * barWidth}, 0)`)
          .merge(bar)
        bar.exit().remove()

        bar.append('rect')
          .style('cursor', 'pointer')
          .attr('y', height)
          .attr('height', 0)
          .attr('width', barWidth)
          .transition('ease')
          .attr('y', d => y(d.value))
          .attr('height', d => height - y(d.value))

        bar.append('line')
          .style('stroke', '#fff')
          .attr('x2', (d, i) => i * barWidth)
          .attr('y2', 0)

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
      }
    }
  }
</script>

<style>
  #e32 rect {
    transition: all .3s;
    fill: steelblue;
  }

  #e32 rect:hover {
    fill: #0000ff;
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

  #e321 text {
    font: bold 48px monospace;
  }

  #e321 .enter {
    fill: green;
  }

  #e321 .update {
    fill: #333;
  }

  #e321 .exit {
    fill: brown;
  }
</style>
