import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { Typography } from 'antd';
const { Title } = Typography;
import { checkNull } from '@ql/lib/helpers/utils'
import GenericDataComponent from './GenericDataComponent';
import DemographicsInstance from './DemographicsInstance';
import TabbedCards from './TabbedCards'

const Demographics = () => {
    const data = useSelector((state) => state.place.data);
    const dataProperties = () =>
        [
            {
                name: 'Demographics growth rate',
                key: 'demographicsGrowthRate',
                value: checkNull(data?.demographicsGrowthRate)
            }
        ]
        ;

    return (
        <TabbedCards title="Demographics">
            <DemographicsInstance />
            <GenericDataComponent data={data} dataProperties={dataProperties} />
        </TabbedCards>
    );
}

export default Demographics;