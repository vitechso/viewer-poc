import React from 'react';
import { useSelector } from 'react-redux';
import basicStyle from '@ql/styles/constants';
import { Card } from 'antd';
import { Typography, Divider } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

const RelationsGraphInstance = () => {
	const data = useSelector((state) => state.place.data);

	const { rowStyle, colStyle, gutter } = basicStyle;
	return (
		<>
			<Card
				hoverable
				style={{}} >
			</Card>
		</>
	);
}

export default RelationsGraphInstance;