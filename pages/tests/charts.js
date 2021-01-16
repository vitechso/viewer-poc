import React from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import basicStyle from "@iso/assets/styles/constants";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import DashboardLayout from '../../containers-ql/DashBoardLayout/DashboardLayout';
import { Row, Col } from "antd";
import { Card } from 'antd';
import { Typography, Divider } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

// This component knows how to resize it self
import GoogleTrendLineChartsComponent from "../../Components/Testing/Charts/Wrapped/GoogleTrendLineChartsComponent"


import HorizontalStackedBarChartG2 from "../../Components/Charts/G2/HorizontalStackedBarChart"
import HorizontalStackedBarChartMisc from "../../Components/Charts/Misc/HorizontalStackedBarChart"
import AreaChartComponent from "../../Components/Charts/Rechart/AreaChartComponent"
import SymmetricBarChartAnt  from "../../Components/Charts/AntDesign/SymmetricBarChart"

// import AreaChartComponent from '../../Components/Testing/Charts/Rechart/AreaChartComponent'
// import LineChartComponent from '../../Components/Testing/Charts/AntDesign/LineChartComponent'
// import WrappedChartFromDemo from '../../Components/Testing/Charts/Wrapped/WrappedChartFromDemo'
// dynamically load the chart components that need to have access to windowSize.
// const AreaChartComponent = dynamic(
//     () => import("../../Components/Testing/Charts/Rechart/AreaChartComponent"),
//     { ssr: false }
// )

// Note! that this one has a 'autoFit' prop so it might not need to be dynamicly loaded
// const LineChartComponent = dynamic(
//     () => import("../../Components/Testing/Charts/AntDesign/LineChartComponent"),
//     { ssr: false }
// )

// const WrappedChartFromDemo = dynamic(
//     () => import("../../Components/Testing/Charts/Wrapped/WrappedChartFromDemo"),
//     { ssr: false }
// )

const charts = () => {
    const { rowStyle, colStyle, gutter } = basicStyle;

    return (<>
        <Head>
            <title>Chart components</title>
        </Head>
        <DashboardLayout>
            <LayoutWrapper>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Title><a href="https://react-google-charts.com/" target="_blank">react-google-charts</a></Title>
                        <Card>
                            <GoogleTrendLineChartsComponent />
                        </Card>
                    </Col>
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        AreaChart <Title><a href="https://recharts.org/en-US/" target="_blank">Recharts.org</a></Title>
                        <Card>
                            {/* <AreaChartComponent /> */}
                        </Card>
                    </Col>
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Title>LineChart <a href="https://github.com/ant-design/ant-design-charts" target="_blank">Ant-design charts </a> based on <a href="https://antv-g2plot.gitee.io" target="_blank">G2Plot</a></Title>
                        <Card>
                            {/* <LineChartComponent /> */}
                        </Card>
                    </Col>
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Title>Wrapped from <Link href="/dashboard">Dashboard demo</Link></Title>
                        <Card>
                            {/* <WrappedChartFromDemo /> */}
                        </Card>
                    </Col>
                </Row>

                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Title>SymmetricBarChart (AntDesign)</Title>
                        <Card>
                            <SymmetricBarChartAnt />
                        </Card>
                    </Col>
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Title>HorizontalStackedBarChart (G2)</Title>
                        <Card>
                            <HorizontalStackedBarChartG2 />
                        </Card>
                    </Col>
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Title>HorizontalStackedBarChart (misc)</Title>
                        <Card>
                            <HorizontalStackedBarChartMisc />
                        </Card>
                    </Col>
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Title>AreaChart (Rechart)</Title>
                        <Card>
                            <AreaChartComponent />
                        </Card>
                    </Col>
                </Row>

            </LayoutWrapper>
        </DashboardLayout>
    </>);
};

export default charts;