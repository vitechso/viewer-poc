import React, { Component } from 'react';
import { Card } from 'antd';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;
import GoogleChart from 'react-google-charts';
import * as googleChartConfigs from '../../../Charts/Wrapped/GoogleChart/config';

export default function GoogleTrendLineChartsComponent() {
	const data = useSelector((state) => state.place.data);
	return (
		<>
			<Card>
				<GoogleChart {...googleChartConfigs.TrendLines} />
			</Card>
		</>
	);
}
