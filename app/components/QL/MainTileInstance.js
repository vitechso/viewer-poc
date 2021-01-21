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

import { PhoneIcon, EmailIcon, FaxIcon, WebIcon, FacebookIcon, LinkedInIcon, InstagramIcon } from './MainTileInstanceIcons';
import MainTileInstanceMore from './MainTileInstanceMore';

const MainTileInstance = () => {
	const data = useSelector((state) => state.place.data);
	const { rowStyle, colStyle, gutter } = basicStyle;

	const [displayIcons, setDisplayIcons] = useState({ show: true, style: { display: "inline" } })

	const onChange = () => {
		if (displayIcons.show) {
			console.log("Show: " + displayIcons.show);
			setDisplayIcons({ show: false, style: { display: "none" } });
		}
		else {
			console.log("Show: " + displayIcons.show);
			setDisplayIcons({ show: true, style: { display: "inline" } });
		}
	};

	return (
		<>
			<Card>
				{data &&
					<>
						<Row style={{ padding: '0 0 10px 0' }}>
							<Image src={data.image} />
						</Row>
						<Row type="flex" gutter={gutter} align="middle" justify="start">
							<Col span={5} flex={1} >
								<Image src={data.logo} />
							</Col>
							<Col span={1}></Col>
							<Col align="start">
								<Row>
									<Space size={1} direction="vertical" align="start"  >
										<Space size={1} direction="vertical" align="start"  >
											<Text className="ql-entity-name">{data.name}</Text>
										</Space>
										<Space size={-4} direction="vertical" align="start"  >
											<Text className="ql-entity-description">{data.description}</Text>
											<Text type="secondary">{data.alternateName}</Text>
										</Space>
									</Space>
								</Row>
							</Col>
						</Row>
						<Divider style={{}} />
						<Row >
							<Col span={24} >
								<Collapse bordered={false} ghost={true} expandIconPosition={"right"} onChange={onChange}>
									<Panel header={<span style={displayIcons.style}>
										<Space size={2} direction="horizontal" align="start"  >
											<PhoneIcon /><EmailIcon /><FaxIcon /><WebIcon /><FacebookIcon /><LinkedInIcon /><InstagramIcon />
										</Space>
									</span>} key="1">
										<MainTileInstanceMore />
									</Panel>
								</Collapse>
							</Col>
						</Row>
					</>
				}
				{/* TODO: These two are missing from displaying! Type doesn't print because of @ but additionalType isn't sent over from the API */}
				{/* <h6> {data.type}</h6>
                <h6>{data.additionalType}</h6>*/}

			</Card>
		</>
	);
}

export default MainTileInstance;