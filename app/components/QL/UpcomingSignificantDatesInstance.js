import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import { Card } from 'antd';
import { Row, Col } from 'antd';
import { checkNull } from '@ql/lib/helpers/utils'
import Link from 'next/link'
import { Typography, Divider } from 'antd';
const { Title, Paragraph, Text } = Typography;

//TODO: Is this the best way to do this? See comment in GetIcon().
import christianIcon from '@ql/assets/images/SpecialDays/Christian.png';
import nationalHollidayIcon from '@ql/assets/images/SpecialDays/NationalHolliday.png';
import observanceIcon from '@ql/assets/images/SpecialDays/observance.png';
import hinduIcon from '@ql/assets/images/SpecialDays/Hindu.png';
import muslimIcon from '@ql/assets/images/SpecialDays/Muslim.png';
import silentDayIcon from '@ql/assets/images/SpecialDays/SilentDay.png';
import weekdayIcon from '@ql/assets/images/SpecialDays/Weekday.png';
// permutation icons
import religiousNationalHolliday from '@ql/assets/images/SpecialDays/permutations/religiousNationalHolliday.png';
import religiousObservance from '@ql/assets/images/SpecialDays/permutations/religiousObservance.png';
import religiousSilentDay from '@ql/assets/images/SpecialDays/permutations/religiousSilentDay.png';

import { lookupByIdentifier, timeseriesByIdentifier } from '@ql/components/excel/commands'

const UpcomingSignificantDatesInstance = () => {
    const data = useSelector((state) => state.place.data);
    const dataProperties = (e) => [
        {
            name: 'Date',
            key: 'upcommingSignificantDate_Date',
            value: checkNull(e?.upcommingSignificantDate_Date)
        },
        {
            name: 'Name english',
            key: 'upcommingSignificantDate_Name_en',
            value: checkNull(e?.upcommingSignificantDate_Name_en)
        },
        {
            name: 'Name current culture',
            key: 'upcommingSignificantDate_Name_currentCulture',
            value: checkNull(e?.upcommingSignificantDate_Name_currentCulture)
        }
        ,
        {
            name: 'Iconagraphy',
            key: 'upcommingSignificantDate_Day_Iconagraphy',
            value: checkNull(e?.upcommingSignificantDate_Day_Iconagraphy)
        }
    ]

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render(text, record) {
                if (record.dayType === 'religiousNationalHoliday') {
                    return {
                        props: {
                            style: { color: "red" },
                        },
                        children: <div>{text}</div>,
                    };
                } else {
                    return {
                        props: {
                            style: {},
                        },
                        children: <div>{text}</div>,
                    };
                }
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render(text, record) {
                if (record.dayType === 'religiousNationalHoliday') {
                    return {
                        props: {
                            style: { color: "red" },
                        },
                        children: <div>{text}</div>,
                    };
                } else {
                    return {
                        props: {
                            style: {},
                        },
                        children: <div>{text}</div>,
                    };
                }
            },
        },
        {
            dataIndex: 'dayType',
            key: 'dayType',
            render(text, record) {
                return
            }
        },
        {
            dataIndex: 'typeIcon',
            key: 'typeIcon',
            render: typeIcon => (
                <Row>
                    {typeIcon.map(type => {
                        return (<div key={Math.random()}> {type} </div>)
                    })}
                </Row>
            )
        }
    ];

    const [dataSource, setDataSource] = useState([]);

    let ds = [];
    function pushValues(properties) {
        let date;
        let dayType;
        let nameEn;
        let nameCurrentCulture;
        let icon;

        for (let i = 0; i < properties.length; i++) {
            if (properties[i].key === 'upcommingSignificantDate_Date') {
                date = properties[i].value;
            }
            if (properties[i].key === 'upcommingSignificantDate_Day_Iconagraphy') {
                dayType = properties[i].value;
            }
            if (properties[i].key === 'upcommingSignificantDate_Name_en') {
                nameEn = properties[i].value;
            }
            if (properties[i].key === 'upcommingSignificantDate_Name_currentCulture') {
                nameCurrentCulture = properties[i].value;
            }
            if (properties[i].key === 'upcommingSignificantDate_Day_Iconagraphy') {
                icon = GetIcon(properties[i].value);
            }
        }

        let name = `${nameCurrentCulture} / ${nameEn}`;

        ds.push({
            key: Math.random(),
            date: date,
            name: name,
            dayType: dayType,
            typeIcon: icon
        });
    }

    useEffect(() => {
        if (data.upcommingSignificantDates) {
            data.upcommingSignificantDates.map((e => {
                let properties = dataProperties(e);
                pushValues(properties)
            }))

            setDataSource(ds);
        }
    }, [data.upcommingSignificantDates]);

    function GetIcon(dayIconagraphy) {
        switch (dayIconagraphy) {
            case 'observantDay':
                // NOTE that there is an Image next compenent in the newest version of Next https://nextjs.org/docs/basic-features/image-optimization that we could point directly to.
                return [<img src={observanceIcon} />]
            case 'relegiousSilentDay':
                return [<img src={religiousSilentDay} />]
            case 'religiousNationalHoliday':
                return [<img src={religiousNationalHolliday} />]
            default:
        }
    }

    return (
        <Card>
            <Table showHeader={true} dataSource={dataSource} columns={columns} pagination={false} />
        </Card>
    );
}

export default UpcomingSignificantDatesInstance;
