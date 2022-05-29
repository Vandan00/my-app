import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function BarChart() {
  const ref = useRef();
  const BOTTOM_PADDING = 10;
  const LEFT_PADDING = 10;
  const RIGHT_PADDING = 10;
  const TOP_PADDING = 10;
   
  const HEIGHT = 300;
  const WIDTH = 400;
   

  const usableHeight = HEIGHT - TOP_PADDING - BOTTOM_PADDING;
  const usableWidth = WIDTH - LEFT_PADDING - RIGHT_PADDING;
  let yAxisGroup, xAxisGroup;
  

  const allData = [
    {name: 'apple', colorIndex: 1},
    {name: 'banana', colorIndex: 2},
    {name: 'cherry', colorIndex: 3},
    {name: 'date', colorIndex: 4},
    {name: 'grape', colorIndex: 5},
    {name: 'mango', colorIndex: 6},
    {name: 'peach', colorIndex: 7},
    {name: 'raspberry', colorIndex: 8},
    {name: 'strawberry', colorIndex: 9},
    {name: 'tangerine', colorIndex: 10},
    {name: 'watermelon', colorIndex: 11}
  ];
   
  let barPadding, barWidth, xScale, yScale;

  const colorScale = d3.scaleOrdinal(d3.schemePaired);

  const random = max => Math.floor(Math.random() * max + 1);
   

  function getRandomData() {
    const count = random(allData.length);
    const shuffled = allData.sort(() => 0.5 - Math.random());
    const data = shuffled.slice(0, count);
    data.sort((f1, f2) => f1.name.localeCompare(f2.name));
    for (const item of data) {
      item.score = random(10);
    }
    return data;
  }

  function updateRect(rect) {
    rect

      .attr('fill', d => colorScale(d.colorIndex))
      .attr('width', barWidth - barPadding * 2)
      .attr('height', d => usableHeight - yScale(d.score))
      .attr('x', barPadding)
      .attr('y', d => TOP_PADDING + yScale(d.score));
  }

  function updateData() {
    const data = getRandomData();
   

    barPadding = Math.ceil(30 / data.length);

    barWidth = usableWidth / data.length;

    xScale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([LEFT_PADDING, LEFT_PADDING + usableWidth]);
   
    const max = d3.max(data, d => d.score);
    yScale = d3.scaleLinear().domain([0, max]).range([usableHeight, 0]);

    const svg = d3.select(ref.current).attr('width', WIDTH).attr('height', HEIGHT);


    const groups = svg
      .selectAll('.bar')
      .data(data, d => d.name)
      .join(enter => {

        const groups = enter.append('g').attr('class', 'bar');
   
        groups
          .append('rect')
          .attr('height', 0)
          .attr('y', TOP_PADDING + usableHeight);
   
        return groups;
      });
   
    groups.attr('transform', (_, i) => `translate(${xScale(i)}, 0)`);
   

    updateRect(groups.select('rect'));

    function updateYAxis(svg, data, max) {
      if (!yAxisGroup) {

        yAxisGroup = svg
          .append('g')
          .attr('class', 'y-axis')
          .attr('transform', `translate(${LEFT_PADDING}, ${TOP_PADDING})`);
      }
  
      const tickValues = Array.from(Array(max + 1).keys());
  

      const yAxis = d3
        .axisLeft(yScale)
        .tickValues(tickValues)
        .tickFormat(n => n.toFixed(0));

      yAxis(yAxisGroup);

    }
    updateYAxis(svg, data, max);
    function updateXAxis(svg, data) {
      if (!xAxisGroup) {
        xAxisGroup = svg
          .append('g')
          .attr('class', 'x-axis')
          .attr('transform', `translate(0, ${TOP_PADDING + usableHeight})`);
      }
  
      const xAxisScale = d3
        .scaleBand()
        .domain(data.map(item => item.name)) 
        .range([LEFT_PADDING, LEFT_PADDING + usableWidth]);
  
      const xAxis = d3.axisBottom(xAxisScale).ticks(data.length);
      xAxis(xAxisGroup);
    }
    updateXAxis(svg, data);
  }
  updateData();

  useEffect(() => {
    updateData();
}, [allData, updateData]);


  return (
    <div>
    <svg ref={ref}></svg>
 
    <div>
        <button onClick={updateData}> Update</button>
      </div>
      </div>
  );
}

export default BarChart;