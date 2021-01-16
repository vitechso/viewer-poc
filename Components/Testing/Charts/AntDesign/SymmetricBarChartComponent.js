import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'antd';
import { Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;
import { percentage, isServer } from '../../../../lib/helpers/utils';
import useWindowSize from '../../../../lib/helpers/useWindowSize';

export default function SymmetricBarChartComponent() {
    if (isServer) {
        console.error("You should load this component with dynamic so we can get useWindowSize() to work" + isServer);
    }

    const data = useSelector((state) => state.place.data);

    const size = useWindowSize();
    var width = window.innerWidth - percentage(size.width, 30)
    var height = window.innerWidth - percentage(size.height, 30)

    return (
        <>
            <Card>
                <SymmetricBarChart />
            </Card>
        </>
    );

}