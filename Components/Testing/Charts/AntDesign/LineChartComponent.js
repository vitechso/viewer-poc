import React, { useRef } from 'react';
import dynamic from "next/dynamic";
import { useSelector } from 'react-redux';
import { percentage, isServer } from '../../../../lib/helpers/utils';
import useWindowSize from '../../../../lib/helpers/useWindowSize';
import { Typography, Divider } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

const Line = dynamic(
    () => import("@ant-design/charts").then((mod) => mod.Line),
    { ssr: false }
)

export default function LineChartComponent() {
    if (isServer) {
        console.error("You should load this component with dynamic so we can get useWindowSize() to work" + isServer);
    }
    
    //TODO: Create/get data from API
    const dataX = useSelector((state) => state.place.data);

    const size = useWindowSize();

    var width = window.innerWidth - percentage(size.width, 30)
    var height = window.innerWidth - percentage(size.height, 30)

    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
    ];

    const config = {
        data,
        width: width,
        height: height,
        autoFit: true, //This auto-sizes this graph
        xField: 'year',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa',
            },
        },
    };

    const ref = useRef();

    const downloadImage = () => {
        ref.current?.downloadImage();
    };


    const toDataURL = () => {
        console.log(ref.current?.toDataURL());
    };

    return (
        <>
            <button type="button" onClick={downloadImage} style={{ marginRight: 24 }}>download image </button>
            <button type="button" onClick={toDataURL}>to data url</button>

            <Line {...config} chartRef={ref} />
        </>
    );
};
