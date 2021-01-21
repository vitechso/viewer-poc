import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import { percentage, isServer } from '@ql/lib/helpers/utils';
import useWindowSize from '@ql/lib/helpers/useWindowSize';

const BidirectionalBar = dynamic(
  () => import("@ant-design/charts").then((mod) => mod.BidirectionalBar),
  { ssr: false }
)

// https://charts.ant.design/demos/bidirectional-bar/#%E5%9F%BA%E7%A1%80%E5%9E%82%E7%9B%B4%E6%96%B9%E5%90%91%E5%AF%B9%E7%A7%B0%E6%9D%A1%E5%BD%A2%E5%9B%BE
const SymmetricBarChart = () => {
  var data = [
    {
      age: '0',
      'Male': 72.9,
      'Female': 72.9,
    },
    {
      age: '10',
      'Male': 72.9,
      'Female': 72.9,
    },
    {
      age: '20',
      'Male': 54.4,
      'Female': 54.4,
    },
    {
      age: '30',
      'Male': 44.4,
      'Female': 44.4,
    },
    {
      age: '40',
      'Male': 34.4,
      'Female': 34.4,
    },
    {
      age: '50',
      'Male': 19.5,
      'Female': 19.8,
    },
    {
      age: '60',
      'Male': 8.3,
      'Female': 8.3,
    },
    {
      age: '70',
      'Male': 6.3,
      'Female': 6.3,
    },
    {
      age: '85+',
      'Male': 4,
      'Female': 8.3,
    }
  ];

  //Massive customization API https://charts.ant.design/demos/bidirectional-bar/?type=api
  var config = {
    data: data,
    width: 200,
    height: 100,
    //autoFit: true,
    xField: 'age',
    xAxis: { position: 'bottom' },
    interactions: [{ type: 'active-region' }],
    yAxis: false,
    yField: ['Male', 'Female'],
    color: ['#A6C7DD', '#3F6587'],
    legend: false,
    tooltip: {
      shared: false,
      showMarkers: false,
    }
  };

  return (
    <>
      <BidirectionalBar {...config} />
    </>
  );
}

export default SymmetricBarChart;