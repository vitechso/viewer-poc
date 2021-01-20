import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'antd';
import { Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;
import { percentage, isServer } from '@ql/lib/helpers/utils';
import useWindowSize from '@ql/lib/helpers/useWindowSize';

import StackedAreaChart from '@ql/Charts/Wrapped/Recharts/Charts/StackedAreaChart';
import * as rechartConfigs from '@ql/Charts/Wrapped/Recharts/config';

export default function WrappedChartFromDemo() {
    if (isServer) {
        console.error("You should load this component with dynamic so we can get useWindowSize() to work" + isServer);
    }

    const data = useSelector((state) => state.place.data);

    const size = useWindowSize();
    var width = window.innerWidth - percentage(size.width, 30)
    var height = window.innerWidth - percentage(size.height, 30)

    const stackConfig = {
        ...rechartConfigs.StackedAreaChart,
        width: width,
        height: height
    };

    return (
        <>
            <Card>
                {/* Chart from the dashboard demo. I moved some of those wrapped charts to Components/Charts */}
                <StackedAreaChart {...stackConfig} />
            </Card>
        </>
    );

}
