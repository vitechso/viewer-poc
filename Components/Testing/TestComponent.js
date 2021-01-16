import React from "react";
import { Typography, Divider } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
import basicStyle from "@iso/assets/styles/constants";
import { Card } from 'antd';
import DrawerComponent from './DrawerComponent';
import CarouselComponent from './CarouselComponent';
import Demographics from '../QL/Demographics';
import Weather from '../QL/Weather';
import TabsHeightTestingComponent from './TabsHeightTestingComponent';

// Use this component to try out stuff! Its allready added to the Place (and test) page. Just uncomment it!
const TestComponent = () => {
    const { rowStyle, colStyle, gutter } = basicStyle;

    return (
        <>
            <Title>
                1.
                <Link href="/testPageWithNoCSS">
                    <a> !CSS  </a>
                </Link>
                2.
                <Link href="/test">
                    <a> dasboard layout</a>
                </Link>.
                3.<Link href="/tests/charts">
                    <a> charts </a>
                </Link>
            </Title>
            <h1>Add your component to the TestComponent.js file</h1>


            {/* Uncomment to see on page */}
            <Card style={{}} >
                <Title level={5}>Tabs</Title>
                <TabsHeightTestingComponent />
            </Card>

            <Card style={{}} >
                <Title level={5}>Demographics with Carousel</Title>
                <Demographics />
            </Card>
            {/* <Card
                hoverable
                style={{}} >
                <Title level={5}>Weather with Carousel</Title>
                <Weather />
            </Card>
            <Card
                hoverable
                style={{}} >
                <Title level={5}>Basic Carousel Component</Title>
                <CarouselComponent />
            </Card>
            <Card
                hoverable
                style={{}} >
                <Title level={5}>Drawer Component (it seems to be overriding the styles above it e.g this text is with-in the DrawerComponent but should be above!)</Title>
                <DrawerComponent />
            </Card> */}
        </>
    );
}

export default TestComponent;