import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { Typography } from 'antd';
const { Title } = Typography;
import { checkNull } from '@ql/lib/helpers/utils'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import GenericDataComponent from './GenericDataComponent';
import WeatherInstance from './WeatherInstance';
import TabbedCards from './TabbedCards'

const Weather = () => {
  const data = useSelector((state) => state.place.data);

  const dataProperties = () => [
    {
      name: 'Temperature High Today',
      key: 'weather_Temperature_High_Today',
      value: checkNull(data?.weather_Temperature_High_Today)
    },
    {
      name: 'Temperature Low Today',
      key: 'weather_Temperature_Low_Today',
      value: checkNull(data?.weather_Temperature_Low_Today)
    },
    {
      name: 'Temperature High Tomorrow',
      key: 'weather_Temperature_High_Tomorrow',
      value: checkNull(data?.weather_Temperature_High_Tomorrow)
    },
    {
      name: 'Temperature Low Tomorrow',
      key: 'weather_Temperature_Low_Tomorrow',
      value: checkNull(data?.weather_Temperature_Low_Tomorrow)
    },
    {
      name: 'Temperature Low The Day After Tomorrow',
      key: 'weather_Temperature_Low_TheDayAfter_Tomorrow',
      value: checkNull(data?.weather_Temperature_Low_TheDayAfter_Tomorrow)
    },
    {
      name: 'Temperature High The Day After Tomorrow',
      key: 'weather_Temperature_High_TheDayAfter_Tomorrow',
      value: checkNull(data?.weather_Temperature_High_TheDayAfter_Tomorrow)
    },
    {
      name: 'Pressure',
      key: 'weather_Pressure',
      value: checkNull(data?.weather_Pressure)
    },
    {
      name: 'Humidity',
      key: 'weather_humidity',
      value: checkNull(data?.weather_humidity)
    },
    {
      name: 'weather_description',
      key: 'weather_description',
      value: checkNull(data?.weather_description)
    },
    {
      name: 'weather_Wind_Avg_Today',
      key: 'weather_Wind_Avg_Today',
      value: checkNull(data?.weather_Wind_Avg_Today)
    },
    {
      name: 'Rain Next 24h',
      key: 'weather_Rain_Next_24h',
      value: checkNull(data?.weather_Rain_Next_24h)
    },
  ]

  return (
    <>
      <TabbedCards title="Weather">
        <WeatherInstance />
        <GenericDataComponent data={data} dataProperties={dataProperties} />
      </TabbedCards>
    </>
  );
}

export default Weather;