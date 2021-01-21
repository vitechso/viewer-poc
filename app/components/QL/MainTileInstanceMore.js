import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import basicStyle from '@ql/styles/constants';
import { Image, Drawer, Button, Divider } from 'antd';
import { Card } from 'antd';
import { Row, Col } from 'antd';
import { Collapse } from 'antd';
const { Panel } = Collapse;
import { Typography, Space } from 'antd';
const { Title, Paragraph, Text } = Typography;

import { PhoneIcon, EmailIcon, FaxIcon, WebIcon, FacebookIcon, LinkedInIcon, InstagramIcon } from './MainTileInstanceIcons'

const MainTileInstanceMore = () => {
    const data = useSelector((state) => state.place.data);
    const { rowStyle, colStyle, gutter } = basicStyle;

    return (
        <>
            {data &&
                <>

                    {/* The figmadesign displays this information in two columns in a row but that doesn´t display nice in excel. Remove this code if we will stick with current implementation */}
                    {/* <Row>
                        <Col span={2}><PhoneIcon /></Col>
                        <Col span={10}>{data.geo.address.telephone}</Col>
                        <Col span={2}><WebIcon /></Col>
                        <Col span={10}>{data.url}</Col>
                    </Row>
                    <Row>
                        <Col span={2}><EmailIcon /></Col>
                        <Col span={10}>{data.geo.address.email}</Col>
                        <Col span={2}><FacebookIcon /></Col>
                        <Col span={10}>{data.contactInfo_facebook}</Col>
                    </Row>
                    <Row>
                        <Col span={2}><FaxIcon /></Col>
                        <Col span={10}>{data.geo.address.faxNumber}</Col>
                        <Col span={2}><LinkedInIcon /></Col>
                        <Col span={10}>{data.contactInfo_linkedIn}</Col>
                    </Row>
                    <Row>
                        {data.contactInfo_instagram &&
                            <>
                                <Col span={2}><InstagramIcon /></Col>
                                <Col span={10}>{data.contactInfo_instagram}</Col>
                            </>
                        }
                    </Row> */}
                    {data.geo &&
                        <Row>
                            {data.geo.address &&
                                <Space size={1} direction="vertical" align="start" >
                                    <Space size={2} direction="horizontal" align="start" >
                                        <PhoneIcon />
                                        {data.geo.address.telephone}
                                    </Space>
                                    <Space size={2} direction="horizontal" align="start" >
                                        <WebIcon />
                                        {data.url}
                                    </Space>
                                    <Space size={2} direction="horizontal" align="start" >
                                        <EmailIcon />
                                        {data.geo.address.email}
                                    </Space>
                                    <Space size={2} direction="horizontal" align="start" >
                                        <FacebookIcon />
                                        {data.contactInfo_facebook}
                                    </Space>
                                    <Space size={2} direction="horizontal" align="start" >
                                        <FaxIcon />
                                        {data.geo.address.faxNumber}
                                    </Space>
                                    <Space size={2} direction="horizontal" align="start" >
                                        <LinkedInIcon />
                                        {data.contactInfo_linkedIn}
                                    </Space>
                                </Space>
                            }
                        </Row>
                    }
                    <Row>
                        {data.contactInfo_instagram &&
                            <>
                                <Col span={2}><InstagramIcon /></Col>
                                <Col span={10}>{data.contactInfo_instagram}</Col>
                            </>
                        }
                    </Row>

                    <Row>
                        <Divider />
                        {data.disambiguatingDescription}
                    </Row>
                    <Row>
                        <Divider />
                        <Space size={1} direction="vertical" align="start" >
                            <Title level={3} strong>Government</Title>
                            <Space size={1} direction="horizontal" align="start" >
                                <Text strong>Mayor: </Text>
                                <Text >Dagur B. Eggertsson</Text>
                            </Space>
                            {/* <Text type="secondary">...and some data that is missing from the json!</Text> */}
                        </Space>
                    </Row>
                    <Row>
                        <Divider />
                        <Space size={1} direction="vertical" align="start" >
                            <Space size={1} direction="horizontal" align="start" >
                                <Text strong>Area: </Text>
                                <Text >273 km2</Text>
                            </Space>
                            <Space size={1} direction="horizontal" align="start" >
                                <Text strong>Founded: </Text>
                                <Text >1786</Text>
                            </Space>
                            {/* <Text type="secondary">...and some more data that is missing from the json!</Text> */}
                        </Space>
                    </Row>
                    <Row>
                        <Divider />
                        <Space size={1} direction="vertical" align="start" >
                            <Space size={1} direction="horizontal" align="start" >
                                <Text strong>Colleges and Universities: </Text>
                                <Text >Reykjavik Universitiy </Text>
                            </Space>
                            <Space size={1} direction="horizontal" align="start" >
                                <Text strong>Neighborhoods: </Text>
                                <Text >Centre, Staðir, Hlemmur, Bryggjuhverfið </Text>
                            </Space>
                            {/* <Text type="secondary">...and some more data that is missing from the json!</Text> */}
                        </Space>
                    </Row>
                </>
            }
        </>
    );
}

export default MainTileInstanceMore;