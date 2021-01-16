import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
const Bar = dynamic(
    () => import("@ant-design/charts").then((mod) => mod.Bar),
    { ssr: false }
)

//https://codesandbox.io/s/g2plot-20-horizontal-stacked-bar-chart-forked-lkux0?file=/index.js
const HorizontalStackedBarChart = () => {

    const data = [
        {
            year: '1991',
            value: 45,
            gender: 'Female',
         },
        // {
        //     year: '1991',
        //     value: 10,
        //     gender: 'Other',
        // },
        {
            year: '1991',
            value: 45,
            gender: 'Male',
        }
    ];

    var config = {
        data: data,
        isStack: true,
        width: 30,
        height: 100,
        //autoFit: true,
        legend: {
            layout: 'horizontal',
            position: 'bottom'
          },
        xField: 'value',
        yField: 'year',
        seriesField: 'gender',
        barWidthRatio: 0.2,
        //color: ['#A6C7DD', '#F37A20', '#3F6587'],
        color: ['#A6C7DD', '#3F6587'],
        yAxis: false,
        xAxis: false,
    };

    return (
        <>
            <Bar {...config} />
        </>
    );
}

export default HorizontalStackedBarChart;