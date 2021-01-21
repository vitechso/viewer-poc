import React from 'react';
import { useSelector } from 'react-redux';
import date from 'date-and-time'
import basicStyle from '@ql/styles/constants';
import { Card } from 'antd';
import { Row, Col } from 'antd';
import { Typography, Space } from 'antd';
const { Title, Paragraph, Text } = Typography;

import VeturImage from '@ql/assets/images/dateTime/vetur.png';
import SagitariusImage from '@ql/assets/images/dateTime/sagitarius.png';
import Group198Image from '@ql/assets/images/dateTime/Group198@2x.png'; //TODO: group? What does this icon show? 
import DifferenceImage from '@ql/assets/images/dateTime/Difference.png';
import SunriseImage from '@ql/assets/images/dateTime/Sunrise.png';
import SunsetImage from '@ql/assets/images/dateTime/Sunset.png';
import DayLengthImage from '@ql/assets/images/dateTime/day-length.png';
import MoonStateImage from '@ql/assets/images/dateTime/Moon.png';

const DateAndTimeInstance = () => {
    let data = useSelector((state) => state.place.data);

    let plusMinus = "";

    if ((typeof data.toDay_Time_UTC_24h !== 'undefined') && (data.toDay_Time_UTC_24h !== null)) {
        let nowClientHour = new Date(Date.now()).getHours();
        let nowClientMinutes = new Date(Date.now()).getMinutes();
        console.log(data.toDay_Time_UTC_24h);
        let placeParsed = date.parse(data.toDay_Time_UTC_24h, "HH:mm:ss");
        let placeHour = new Date(placeParsed).getHours();
        let placeMinutes = new Date(placeParsed).getMinutes();
        let hoursDiff = nowClientHour - placeHour;
        let minutesDiff = nowClientMinutes - placeMinutes;

        // Keep for debug!
        // console.log("API data toDay_Time_UTC_24h: " + data.toDay_Time_UTC_24h)
        // console.log("nowClientHour: " + nowClientHour);
        // console.log("nowClientMinutes: " + nowClientMinutes)
        // console.log("placeHour: " + placeHour);
        // console.log("placeMinutes: " + placeMinutes)

        // this might be unnecessary because timezones are per 1 hour, correct? But it does no harm if not. 
        if (minutesDiff > 30) {
            hoursDiff++;
        }

        if ((hoursDiff === 0)) {
            plusMinus = ""
            data.toDay_timeDifference_between_clients_location_and_this_place = "0";
        } else {
            if (hoursDiff > 0) {
                plusMinus = "+"
            }
            data.toDay_timeDifference_between_clients_location_and_this_place = `${hoursDiff}`;
        }
    }

    //TODO: Move styles to CSS when ready...
    const qlBlue = '#3F6587';
    const qlGray = '#F2F2F2'
    const borderRadius = '5px';
    const rowBottomMargin = 0;
    const rowTopMargin = 0;
    const textLeftMargin = 5;
    const gutter = 4;
    const darkBorderStyle = { border: '1px solid', borderRadius: '5px', background: qlBlue, color: 'white' };
    const darkRowStyle = { ...darkBorderStyle, width: '100%' };
    const grayBorderStyle = { borderRadius: borderRadius, background: qlGray, color: qlBlue };
    const grayRowStyle = { ...grayBorderStyle, width: '100%' };
    const lightColor = { color: 'white' };
    const darkColor = { color: qlBlue };
    return (<>
        <Card>
            {/* Row 1 */}
            <Row gutter={gutter} >
                <Col span={16}>
                    <Row style={{ ...darkRowStyle }} >
                        <Col span={10}>
                            {/* TODO: Make this title larger and stretch (flex-it) it down to content in the next col */}
                            <Title level={1} style={{ color: 'white', marginLeft: textLeftMargin }}>{data.toDay_Number_Of_Day_In_Month}</Title>
                        </Col>
                        <Col span={14}>
                            <Row>
                                <Space size={5} direction="vertical" align="start" >
                                    <Title level={5} style={lightColor}>{data.toDay_Day_Month_Text}</Title>
                                    <Title level={5} style={lightColor}>{data.toDay_Year_Number}</Title>
                                </Space>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={8} >
                    <Row style={{ ...darkRowStyle, height: "50%" }} justify="center" align="middle" >
                        Week {data.toDay_Week_Number}
                    </Row>
                    <Row style={{ ...darkRowStyle, height: "50%" }} justify="center" align="middle">
                        Day {data.toDay_Day_Year_Number}
                    </Row>
                </Col>
            </Row>
            {/* end Row  1*/}

            {/* Row 2 */}
            <Row gutter={gutter} style={{ marginTop: rowTopMargin, marginBottom: rowBottomMargin }}>
                <Col span={16}  >
                    <Row justify="center" align="middle" style={{ ...grayRowStyle, height: "35px" }} >
                        <div style={{ marginLeft: textLeftMargin }}>
                            <Text strong>{data.toDay_Day_FullName_En}/{data.toDay_Day_FullName_CurrentCulture}</Text>
                        </div>
                    </Row>
                </Col>
                <Col span={4} >
                    <Row justify="center" style={{ ...grayRowStyle, height: "35px" }}>
                        <div style={{ margin: "5px" }}>
                            <img src={VeturImage} />
                        </div>
                        {/* {data.toDay_Season} */}
                    </Row>
                </Col>
                <Col span={4} >
                    <Row justify="center" style={{ ...grayRowStyle, height: "35px" }}>
                        <div style={{ margin: "5px" }}>
                            <img src={SagitariusImage} />
                        </div>
                        {/* {data.toDay_Zodiac} */}
                    </Row>
                </Col>
            </Row>
            {/* end Row 2 */}

            {/* Row 3 */}
            <Row gutter={gutter} style={{ marginTop: rowTopMargin, marginBottom: rowBottomMargin }}>
                <Col span={16} >
                    <Row style={darkRowStyle} justify="start">
                        <Space size={0} style={{ marginLeft: textLeftMargin }} direction="vertical" align="start" >
                            <Text style={lightColor}>{data.name} Time</Text>
                            <Title style={{ color: 'white', marginBottom: 0 }}>{data.toDay_Time_UTC_24h}</Title>
                            <Text style={lightColor}> UTC/GMT/EST</Text>
                        </Space>
                    </Row>
                </Col>
                <Col span={8} >
                    <Row style={{ borderRadius: borderRadius, background: qlGray, marginBottom: 5, height: "50%" }} justify="center">
                        <Space size={2} direction="horizontal" align="center" >
                            <img src={Group198Image} />
                            {
                                data.toDay_DaylightSavings == 'true'
                                    ? <Text style={darkColor}> Has DLS</Text>
                                    : <Text style={darkColor}> No DLS</Text>
                            }
                        </Space>
                    </Row>
                    <Row gutter={gutter} style={{ borderRadius: borderRadius, background: qlGray, marginLeft: 0.1, marginRight: 0.1, marginBottom: rowBottomMargin, height: "45%" }} justify="center">
                        <Space size={2} direction="horizontal" align="center" >
                            <img src={DifferenceImage} />
                            <Text style={darkColor}>{plusMinus}{data.toDay_timeDifference_between_clients_location_and_this_place}</Text>
                        </Space>
                    </Row>
                </Col>
            </Row>
            {/* end Row 3 */}

            {/* Row 4 */}
            <Row gutter={gutter} style={{ borderRadius: borderRadius, background: qlGray, marginBottom: 0, marginLeft: 0.1, marginRight: 0.1 }} >
                <Col span={6}>
                    <Row justify="center" align="middle">
                        <img src={SunriseImage} />
                    </Row>
                    <Row justify="center" align="middle">
                        <Text style={darkColor}>{data.toDay_Sun_Rise}</Text>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row justify="center" align="middle">
                        <img src={SunsetImage} />
                    </Row>
                    <Row justify="center" align="middle">
                        <Text style={darkColor}>{data.toDay_Sun_Set}</Text>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row justify="center" align="middle">
                        <img src={DayLengthImage} />
                    </Row>
                    <Row justify="center" align="middle">
                        <Text style={darkColor}>{data.toDay_Sun_Duration}</Text>
                    </Row>
                </Col>
                <Col span={6} >
                    <Row justify="center" align="middle">
                        <img src={MoonStateImage} />
                    </Row>
                    <Row justify="center" align="middle">
                        <Text style={darkColor}>{data.toDay_MoonState_Number}</Text>
                    </Row>
                </Col>
            </Row>
            {/* end Row 4 */}
        </Card>
    </>)
}

export default DateAndTimeInstance;
