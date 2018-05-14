<template>
  <div>
    <svg id="bs"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'e33',
    data() {
      return {
        options: {}
      }
    },
    mounted() {
      let data = {
        boxes: [
          {
            name: 'box first',
            data: [
              {id: 'bf1', name: 'bf-1'},
              {id: 'bf2', name: 'bf-2'},
              {id: 'bf3', name: 'bf-3'}
            ]
          },
          {
            name: 'box second',
            data: [
              {id: 'bs1', name: 'bs-1'},
              {id: 'bs2', name: 'bs-2'}
            ]
          }
        ],
        rel: [
          {from: 'bf1', to: 'bs1', text: 'to'},
          {from: 'bf1', to: 'bs2', text: 'to'}
        ]
      }
      let field = d3.select('#bs')
      field.append('g')
      this.draw(field, data, document.querySelector('#bs').parentNode.offsetWidth)
      window.d3 = d3
    },
    methods: {
      draw(field, data, w = 600, margin = 40) {
        // let boxes = [
        //   {name: 'name1', type: 1},
        //   {name: 'name2', type: 2}
        // ]
        let swimHeight = 200
        let width = w - margin
        let height = data.boxes.length * swimHeight
        let chart = field.attr('width', w)
          .attr('height', height + margin).select('g')
        chart.attr('width', width)
          .attr('height', height)
          .attr('transform', `translate(${margin / 2}, ${margin / 2})`)
        // box
        let swim = chart.selectAll('.swim').data(data.boxes).enter().append('g').attr('transform', (d, i) => `translate(0, ${i * swimHeight})`)
        // swimLine * 2
        swim.append('line')
          .attr('class', 'swimLine')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', width)
          .attr('y2', 0)
          .style('stroke', '#000')
        swim.append('line')
          .attr('class', 'swimLine')
          .attr('x1', 0)
          .attr('y1', swimHeight)
          .attr('x2', width)
          .attr('y2', swimHeight)
          .style('stroke', '#000')
        // asset
        let assets = swim.selectAll('.asset').data(d => d.data)
        assets.enter().append('circle')
          .attr('r', '5')
          .attr('cx', (d, i, k) => {
            let step = w / k.length
            d.cx = step * (i + 0.5)
            return d.cx
          })
          .attr('cy', (d) => {
            d.cy = swimHeight / 2
            return d.cy
          })
        console.log(data)
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
