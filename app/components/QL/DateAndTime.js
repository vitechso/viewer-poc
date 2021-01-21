import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { Typography } from 'antd';
const { Title } = Typography;
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { checkNull } from '@ql/lib/helpers/utils'
import DateAndTimeInstance from './DateAndTimeInstance';
import GenericDataComponent from './GenericDataComponent';
import TabbedCards from './TabbedCards'

const DateAndTime = () => {
    const data = useSelector((state) => state.place.data);
    const dataProperties = () =>
        [
            {
                name: 'Month in text',
                key: 'toDay_Day_Month_Text',
                value: checkNull(data?.toDay_Day_Month_Text)
            },
            {
                name: 'Current month number in year',
                key: 'toDay_Day_Month_Number',
                value: checkNull(data?.toDay_Day_Month_Number)
            },
            {
                name: 'Full name of month in English',
                key: 'toDay_Day_FullName_En',
                value: checkNull(data?.toDay_Day_FullName_En)
            },
            {
                name: 'Full name of day in current culture',
                key: 'toDay_Day_FullName_CurrentCulture',
                value: checkNull(data?.toDay_Day_FullName_CurrentCulture)
            },
            {
                name: 'Day of year',
                key: 'toDay_Day_Year_Number',
                value: checkNull(data?.toDay_Day_Year_Number)
            },
            {
                name: 'Year',
                key: 'toDay_Year_Number',
                value: checkNull(data?.toDay_Year_Number)
            },
            {
                name: 'Time UTC 24h',
                key: 'toDay_Time_UTC_24h',
                value: checkNull(data?.toDay_Time_UTC_24h)
            }
            ,
            {
                name: 'Time GMT 24h',
                key: 'toDay_Time_GMT_24h',
                value: checkNull(data?.toDay_Time_GMT_24h)
            }
            ,
            {
                name: 'Time EST 24h',
                key: 'toDay_Time_EST_24h',
                value: checkNull(data?.toDay_Time_EST_24h)
            }
            ,
            {
                name: 'Time UTC 12h',
                key: 'toDay_Time_UTC_12h',
                value: checkNull(data?.toDay_Time_UTC_12h)
            }
            ,
            {
                name: 'Time GMT 12h',
                key: 'toDay_Time_GMT_12h',
                value: checkNull(data?.toDay_Time_GMT_12h)
            }
            ,
            {
                name: 'Time EST 12h',
                key: 'toDay_Time_EST_12h',
                value: checkNull(data?.toDay_Time_EST_12h)
            }
            ,
            {
                name: 'Time of sunrise',
                key: 'toDay_Sun_Rise',
                value: checkNull(data?.toDay_Sun_Rise)
            }
            ,
            {
                name: 'Time of sunset',
                key: 'toDay_Sun_Set',
                value: checkNull(data?.toDay_Sun_Set)
            }
            ,
            {
                name: 'Duration of sunslight',
                key: 'toDay_Sun_Duration',
                value: checkNull(data?.toDay_Sun_Duration)
            }
            ,
            {
                name: 'Daylight savings',
                key: 'toDay_DaylightSavings',
                value: checkNull(data?.toDay_DaylightSavings)
            }
            ,
            {
                name: 'Season',
                key: 'toDay_Season',
                value: checkNull(data?.toDay_Season)
            }
            ,
            {
                name: 'Zodiac',
                key: 'toDay_Zodiac',
                value: checkNull(data?.toDay_Zodiac)
            }
        ];

    return (
        <TabbedCards title="Today">
            <DateAndTimeInstance />
            <GenericDataComponent data={data} dataProperties={dataProperties} />
        </TabbedCards>
    );
}

export default DateAndTime;