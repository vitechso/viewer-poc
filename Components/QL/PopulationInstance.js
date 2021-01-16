import React, { Component } from 'react';
import dynamic from "next/dynamic";
import { useSelector } from 'react-redux';
import basicStyle from '@iso/assets/styles/constants';
import { Card } from 'antd';
import { Typography, Divider } from 'antd';
const { Title, Paragraph, Text } = Typography;

const AreaChartComponent = dynamic(
	() => import("../Charts/Rechart/AreaChartComponent"),
	{ ssr: false }
)

export default function PopulationInstance() {
	const data = useSelector((state) => state.place.data);

	const { rowStyle, colStyle, gutter } = basicStyle;

	return (
		<>
        <Card>
			<AreaChartComponent />
            </Card>
		</>
	);
}
