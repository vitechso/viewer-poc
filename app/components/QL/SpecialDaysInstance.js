import React from 'react';
import { useSelector } from 'react-redux';
import basicStyle from '@ql/styles/constants';
import { Card } from 'antd';
import { Typography, Divider } from 'antd';
const { Title, Paragraph, Text } = Typography;

const SpecialDaysInstance = () => {
	const data = useSelector((state) => state.place.data);

	const { rowStyle, colStyle, gutter } = basicStyle;
	return (
		<>
			<Card
				style={{}}>

				<div>
					<b>TODO:</b>:
				{/* TODO: Create data */}
					{/* {data.specialDays && (
						data.specialDays
					)} */}
				</div>

			</Card>
		</>
	);
}

export default SpecialDaysInstance;