import React, { useEffect } from 'react';

function RadialChart() {
  let user_limit = null;
  let noc_limit = null;
  let consumption = null;
  let date = null;
  const dimension = 315;
  let total = null;

  useEffect(() => {
    getConsumptionValue();
    latestDate();
    drawChart();
  }, []);

  function drawChart() {
    const consumption_radian = getRadian(consumption);
    const user_limit_radian = getRadian(user_limit);
    const noc_limit_radian = getRadian(noc_limit);
    const canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');

    const centre = parseInt(dimension / 2);
    const radius = parseInt(centre * 0.70);
    const trackWidth = 40;
    const pathWidth = 35;

    // Draw base
    ctx.shadowBlur = 2;
    ctx.shadowOffsetY = 1;
    ctx.shadowColor = "lightgrey";
    ctx.strokeStyle = "white";
    ctx.lineWidth = trackWidth;
    ctx.beginPath();
    ctx.arc(centre, centre, radius, -0.5 * Math.PI, 1.5 * Math.PI);
    ctx.stroke();

    // Draw paths based on consumption and limits...
    // (Remaining drawing logic...)

    // Cleanup
    ctx.restore();
    ctx.save();
  }

  function latestDate() {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth());
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    date = `${month} ${year}`;
  }

  function getConsumptionValue() {
    let radial_chart_total = window.localStorage.getItem('totalConsumption');
    total = parseInt(radial_chart_total);
    consumption = Math.floor(total / 1000);
    user_limit = parseInt(window.localStorage.getItem('user_limit'));
    noc_limit = parseInt(window.localStorage.getItem('noc_limit'));
  }

  function getEndValue() {
    if (consumption > noc_limit) {
      return parseInt(consumption + 0.2 * noc_limit);
    } else {
      return parseInt(noc_limit + 0.2 * noc_limit);
    }
  }

  function getRadian(value) {
    const endValue = getEndValue();
    const x1 = 0;
    const y1 = -0.5;
    const x2 = endValue;
    const y2 = 1.5;
    const multiplier = ((y2 - y1) / (x2 - x1)) * (value - x1) + y1;
    return multiplier * Math.PI;
  }

  return (
    <div>
      <canvas id="myCanvas" width="320" height="320" style={{ border: '1px solid #d3d3d3' }}></canvas>
    </div>
  );
}

export default RadialChart;