import React from 'react';
import { useSelector } from 'react-redux';
import basicStyle from '@iso/assets/styles/constants';
import { Card } from 'antd';
import { Row, Col } from 'antd';
import { Typography, Divider, Space } from 'antd';
const { Title, Paragraph, Text } = Typography;

import SunImage from '@iso/assets/images/weather/Sun-Blue.png';
import WindRainCloudImage from '@iso/assets/images/weather/Wind-Rain-cloud-Blue.png';
import SunRainCloudImage from '@iso/assets/images/weather/Sun-rain-cloud-Blue@2x.png';
import selectedCelsiusImage from '@iso/assets/images/temperature/celsiusSelected.png';
import unselectedFarenheitImage from '@iso/assets/images/temperature/farenheitUnselected.png';
import unselectedKelvinImage from '@iso/assets/images/temperature/kelvinUnselected-2.png';

const WeatherInstance = () => {
    let data = useSelector((state) => state.place.data);

    const { rowStyle, colStyle, gutter } = basicStyle;
    const titleStyle = { fontSize: "large", fontWeight: "bolder" };
    const heatStyle = { marginBottom: 0 };
    const noBrake = { whiteSpace: "nowrap" }
    return (
        <>
            <div style={{ backgroundColor: "white", padding: 15 }} >
                {data && (<>
                    <Row style={rowStyle} gutter={gutter} >
                        <Col span={24} style={colStyle} >
                            <Row>
                                <Col span={12} align="center" justify="center">,
                                    <img src={SunRainCloudImage} />
                                </Col>
                                <Col span={12} align="start">
                                    <Space size={1} direction="vertical" align="start" >
                                        <Text style={titleStyle}>Current Temperature</Text>
                                        <Title level={1} style={heatStyle}>{data.weather_Temperature_Current}</Title>
                                        <Text type="secondary">Hi: {data.weather_Temperature_High_Today} Lo: {data.weather_Temperature_Low_Today}</Text>
                                        <Text type="secondary">Rain 24h {data.weather_Rain_Next_24h}</Text>
                                        <Text type="secondary" style={noBrake}>Wind (24h avg) {data.weather_Wind_Avg_Today}</Text>
                                    </Space>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={rowStyle} gutter={gutter} >
                        <Col span={12} style={colStyle} align="start" justify="center">
                            <Space size={0} direction="vertical" align="start" >
                                <img src={SunImage} />
                                   Tomorrow
                                    <Text type="secondary">{data.weather_Temperature_Low_Tomorrow}/{data.weather_Temperature_High_Tomorrow}</Text>
                            </Space>
                        </Col>
                        <Col span={12} >
                            <Space size={0} direction="vertical" align="start" >
                                <img src={WindRainCloudImage} />
                                {data.ToDay_Day_FullName_En}
                                Day after tomorrow
                                <Text type="secondary">{data.weather_Temperature_Low_TheDayAfter_Tomorrow}/{data.weather_Temperature_High_TheDayAfter_Tomorrow}</Text>
                            </Space>
                        </Col>
                    </Row>

                    <Row style={rowStyle} gutter={gutter} >
                        <Col>
                            <img src={selectedCelsiusImage} />
                        </Col>
                        <Col>
                            <img src={unselectedFarenheitImage} />
                        </Col>
                        <Col>
                            <img src={unselectedKelvinImage} />
                        </Col>
                    </Row>
                </>)}
            </div>
        </>
    );
}

export default WeatherInstance;