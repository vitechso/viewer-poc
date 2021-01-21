import React from 'react';
import { useSelector } from 'react-redux';
import basicStyle from '@ql/styles/constants';
import { Card } from 'antd';
import { Typography, Divider } from 'antd';
const { Title, Paragraph, Text } = Typography;

import GoogleMapReact from 'google-map-react'; //https://github.com/google-map-react/google-map-react

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GeoLocation = () => {
	const data = useSelector((state) => state.place.data);
	const props = {
		center: {
			lat: data.latitude,
			lng: data.longitude
		},
		zoom: 11
	};

	// console.log("latitude: " +data.latitude)
	// console.log("longitude: " +data.longitude)
	//console.log(JSON.stringify(props))

	const { rowStyle, colStyle, gutter } = basicStyle;
	return (
		<Card>
			<div style={{ height: '50vh', width: '100%', borderRadius: '5px' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: 'AIzaSyDLJ3EJc4IbB5qTrIoGSfwdMCWfv1O-Ufk' }}
					center={props.center}
					zoom={props.zoom}
				>
					<AnyReactComponent
						lat={data.latitude}
						lng={data.longitude}
						text=""
					/>
				</GoogleMapReact>
			</div>
		</Card>
	);
}

export default GeoLocation;