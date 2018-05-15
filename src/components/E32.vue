<template>
  <div>
    <svg id="e32"></svg>
    <svg id="e321"></svg>
    <div id="e322"></div>
    <div id='root'></div>
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
//      d3.interval(() => {
//        this.update(chart, data.map(item => Object.assign({}, item, {value: (Math.random() * 6).toFixed(2) + 1})).slice(0, Math.floor(Math.random() * (data.length - 3)) + 3))
//      }, 1500)

      let data2 = [3, 7, 9, 1, 4, 6, 8, 2, 5]
      let w = 700
      let h = 300

      let chart2 = d3.select('#e322')
        .append('svg:svg')
        .attr('width', w + 40)
        .attr('height', h + 40)
      let vis = chart2.append('svg:g')
        .attr('width', w)
        .attr('height', h)
        .attr('transform', 'translate(20,20)')
      this.updateLine(vis, data2, w, h)
      d3.interval(() => {
        this.updateLine(vis, [...new Array(Math.floor(Math.random() * 5) + 5)].map(() => Math.ceil(Math.random() * 5)), w, h)
      }, 1500)

      window.d3 = d3
    },
    methods: {
      updateLine(vis, data2, w, h) {
//        let max = d3.max(data2)
        let x = d3.scaleLinear().domain([0, data2.length - 1]).range([0, w])
        let y = d3.scaleLinear().domain([0, 11]).range([h, 0])

        let yticks = vis.selectAll('.ticky')
          .data(y.ticks())
          .enter().append('svg:g')
          .attr('transform', (d) => `translate(0, ${y(d)})`)
          .attr('class', 'ticky')

        yticks.append('svg:line')
          .attr('stroke', '#aaa')
          .attr('y1', 0)
          .attr('y2', 0)
          .attr('x1', 0)
          .attr('x2', w)

        yticks.append('svg:text')
          .style('color', '#aaa')
          .text((d) => d)
          .attr('text-anchor', 'end')
          .attr('dy', 2)
          .attr('dx', -8)

        let xticks = vis.selectAll('.tickx').data(x.ticks())

        xticks.enter().append('svg:g')
          .attr('class', 'tickx')

        xticks = vis.selectAll('.tickx').attr('transform', (d) => `translate(${x(d)}, 0)`)

        let xline = xticks.selectAll('line').data(d => [d])
        xline.enter().append('svg:line')
        xticks.selectAll('line')
          .transition()
          .attr('stroke', '#aaa')
          .attr('y1', 0)
          .attr('y2', h)
          .attr('x1', 0)
          .attr('x2', 0)

        let xtext = xticks.selectAll('text').data(d => [d])
        xtext.enter().append('svg:text')
        xticks.selectAll('text')
          .transition()
          .style('color', '#aaa')
          .text((d) => d)
          .attr('text-anchor', 'end')
          .attr('dy', h + 16)
          .attr('dx', 2)

        let path = vis.selectAll('path.line')
          .data([data2])

        path.enter().append('svg:path')
          .attr('class', 'line')
        path.exit().remove()

        vis.selectAll('path.line')
          .transition()
          .attr('fill', 'none').style('stroke-width', '2')
          .attr('stroke', '#000')
          .attr('d', d3.line()
            .x((d, i) => x(i))
            .y(y))

        let point = vis.selectAll('.point').data(data2)
        point.enter().append('svg:circle')
          .attr('class', 'point')
        vis.selectAll('.point').attr('cx', (d, i) => x(i))
          .attr('cy', y)
          .attr('r', 6)
      },
      update(wrapper, data, width = 600, height = 400) {
        let margin = 60
        let barWidth = width / data.length
        let y = d3.scaleLinear()
          .domain([0, d3.max(data.map(item => item.value))])
          .range([height, 0])
        let x = d3.scaleBand()
          .domain(data.map(item => item.name))
          .range([0, width])

        let chart = wrapper.attr('width', width + margin)
          .attr('height', height + margin).select('g')
          .attr('transform', `translate(${margin / 2},${margin / 2})`)

        let bar = chart.selectAll('g.bar').data(data)
        bar.enter().append('g').attr('class', 'bar')

        bar.exit().remove()
        bar = chart.selectAll('g.bar')
        bar.transition().attr('transform', (d, i) => `translate(${i * barWidth}, 0)`)

        let rect = bar.selectAll('rect').data(d => [d]).attr('class', 'rect')
        rect.enter().append('rect')
          .attr('height', 0)
          .attr('y', height)
          .attr('width', barWidth * 0.9)
          .transition('ease')
          .attr('y', d => y(d.value))
          .attr('height', d => height - y(d.value))
          .attr('class', 'enter')
        bar.selectAll('rect.rect')
          .style('cursor', 'pointer')
          .attr('width', barWidth * 0.9)
          .transition('ease')
          .attr('y', d => y(d.value))
          .attr('height', d => height - y(d.value))

        let text = bar.selectAll('text').data(d => [d])
        text.enter().append('text').attr('y', height - 10)
          .transition('ease')
          .attr('x', x.step() * 0.9 / 2)
          .attr('dy', '.75em')
          .attr('y', d => y(d.value) - 10)
        bar.selectAll('text')
          .text(d => d.value)
          .attr('x', x.step() * 0.9 / 2)
          .attr('dy', '.75em')
          .transition('ease')
          .attr('y', d => y(d.value) - 10)

        chart.selectAll('.axis').exit().remove('.axis')
        let xaxis = chart.selectAll('.x').data([1])
        xaxis.enter().append('g').attr('class', 'x axis')

        chart.selectAll('.x')
          .attr('transform', `translate(0, ${height})`)
          .transition()
          .call(d3.axisBottom(x))

        let yaxis = chart.selectAll('.y').data([1])
        yaxis.enter().append('g').attr('class', 'y axis')
        chart.selectAll('.y')
          .attr('transform', `translate(0, 0)`)
          .transition()
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
    fill: #000;
    font: 10px sans-serif;
    text-anchor: middle;
  }

  #e32 .axis text {
    font: 10px sans-serif;
    fill: #000;
    text-anchor: end;
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

  circle.point {
    fill: #fff;
    stroke: #000;
    transition: all .2s;
    cursor: pointer;
  }

  circle.point:hover {
    stroke-width: 3px;
  }
</style>
