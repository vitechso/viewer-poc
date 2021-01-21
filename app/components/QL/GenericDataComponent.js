import React, { useEffect, useState } from 'react';
import basicStyle from '@ql/styles/constants';
import { Card, Table, Button } from 'antd';
import { CheckIfUrl } from '@ql/lib/helpers/utils';
import grabIcon from '@ql/assets/images/grabicon/Grab-line-Blue-inverted.png';
import { lookupByIdentifier, timeseriesByIdentifier } from '@ql/components/excel/commands';

const timeSeriesFields = ["populationMale", "populationFemale", "year", "midPeriod", "founders", "investors", "populationTotal", "populationDensity"];

const GenericDataComponent = ({ data, dataProperties, nestedArrays }) => {
    const { rowStyle, colStyle, gutter } = basicStyle;

    const columns = [
        {
            title: 'Metric',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            render: dt => {
                return <div className="ql-table-cell-metric">{dt}</div>
            }
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            width: '55%',
            render: dt => {
                return <div className="ql-table-cell-value">{CheckIfUrl(dt)}</div>;
            }
        },
        {
            align: 'right',
            title: '',
            width: '15%',
            dataIndex: "excelAction",
            key: "excelAction",
            render: (excelAction) => {
                return <span className="action"><Button type="link" onClick={() => lookup(excelAction[0], excelAction[1])}><img src={grabIcon} /></Button> {timeSeriesFields.includes(excelAction[1]) && <Button type="link" onClick={() => timeseries(excelAction[0], excelAction[1])}><img src="/assets/icons/timeseries.svg" /></Button>} </span>
            }
        }
    ];

    function lookup(identifier, propertyName) {
        lookupByIdentifier(identifier, propertyName);
    }

    function timeseries(identifier, propertyName) {
        timeseriesByIdentifier(identifier, propertyName);
    }

    const [dataSource, setDataSource] = useState([]);

    let ds = [];
    function pushValues(properties) {
        for (let i = 0; i < properties.length; i++) {
            if (nestedArrays) {
                if (nestedArrays.includes(properties[i].name) && typeof properties[i] === 'object') {
                    if (Array.isArray(properties[i].value)) {

                        properties[i].value = properties[i].value.map((n) => {
                            return n.name + ","; //TODO: Remove the trailing comma (,)
                        })
                    }
                }
            }

            ds.push({
                key: Math.random() + i,
                name: properties[i].name,
                value: properties[i],
                excelAction: [data.identifier, ((typeof properties[i].key) === 'string' ? properties[i].key : properties[i].name)]
            });
        }
    }

    useEffect(() => {
        if (data) {
            if (Array.isArray(data)) {
                data.map((e => {
                    let properties = dataProperties(e);
                    pushValues(properties)
                }))
            }
            else {
                let properties = dataProperties();
                pushValues(properties)
            }

            setDataSource(ds);
        }
    }, [data]);

    return (
        <Card>
            {data &&
                <Table size='small' showHeader={true} dataSource={dataSource} columns={columns} pagination={false} scroll={{ y: 350 }}
                />
            }
        </Card>
    );
}

export default GenericDataComponent;