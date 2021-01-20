import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { Card } from 'antd';
const { TabPane } = Tabs;
import { Typography } from 'antd';
const { Title } = Typography;
import { checkNull } from '@ql/lib/helpers/utils'
import TabbedCards from './TabbedCards'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import GenericDataComponent from './GenericDataComponent';
import MainTileInstance from './MainTileInstance';

const MainTile = () => {
    const data = useSelector((state) => state.place.data);

    const dataProperties = () => [
        {
            name: 'Name',
            key: 'name',
            value: checkNull(data?.name)
        },
        {
            name: 'Alternate Name',
            key: 'alternateName',
            value: checkNull(data?.alternateName)
        },
        {
            name: 'Description',
            key: 'description',
            value: checkNull(data?.description)
        },
        {
            name: 'Disambiguating Description',
            key: 'disambiguatingDescription',
            value: checkNull(data?.disambiguatingDescription)
        },
        {
            name: 'Telephone',
            key: 'geo.address.telephone',
            value: checkNull(data?.geo?.address?.telephone)
        },
        {
            name: 'Email',
            key: 'geo.address.email',
            value: checkNull(data?.geo?.address?.email)
        },
        {
            name: 'FaxNumber',
            key: 'geo.address.faxNumber',
            value: checkNull(data?.geo?.address?.faxNumber)
        },
        {
            name: 'Url',
            key: 'url',
            value: checkNull(data?.url)
        },
        {
            name: 'Facebook',
            key: 'contactInfo_facebook',
            value: checkNull(data?.contactInfo_facebook)
        },
        {
            name: 'LinkedIn',
            key: 'contactInfo_linkedIn',
            value: checkNull(data?.contactInfo_linkedIn)
        },
        {
            name: 'Instagram',
            key: 'contactInfo_instagram',
            value: checkNull(data?.contactInfo_instagram)
        }
    ]

    return (
        <TabbedCards title="&nbsp;" tabHeight="auto">
            <MainTileInstance />
            <GenericDataComponent data={data} dataProperties={dataProperties} />
        </TabbedCards>
    );
}

export default MainTile;