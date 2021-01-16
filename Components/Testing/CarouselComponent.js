import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

// Antd desgin Carousel https://ant.design/components/carousel/
const CarouselComponent = () => {
    return (
        <Carousel dotPosition="top">
            <div>
                <h3 style={contentStyle}>Content 1</h3>
            </div>
            <div>
                <h3 style={contentStyle}>Content 2</h3>
            </div>
        </Carousel>
    );
}

export default CarouselComponent;