import React from 'react';
import { useSelector } from 'react-redux';
import { percentage, isServer } from '@ql/lib/helpers/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from 'antd';
import { Typography, Divider } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

export default function AreaChartComponent() {
    if (isServer) {
        console.error("You should load this component with dynamic so we can get useWindowSize() to work" + isServer);
    }

    const data = useSelector((state) => state.timeseries.data);
    console.log("data: " + JSON.stringify(data));
    let chartData = [];
    if (data && data.resultArray) {
        data.resultArray.forEach(elementValue => {
            chartData.push(
                {
                    name: '',
                    value: elementValue,
                    pv: 2400, //TODO: These values are used for?
                    amt: 2400 //TODO: These values are used for?
                }
            )
        });
    }

    return (
        <>
            <Card bodyStyle={{ padding: "0" }}>
                <Title>{chartData.populationTotal}</Title>
                <ResponsiveContainer width={'100%'} height={100}>
                    <AreaChart
                        data={chartData}
                        margin={{
                            top: 0, right: 0, left: 0, bottom: 0,
                        }} >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        {/* <XAxis dataKey="name" /> */}
                        {/* <YAxis /> */}
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Area type="monotone" dataKey="value" stroke="#A6C7DD" fill="#3F6587" />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>
        </>
    );
}