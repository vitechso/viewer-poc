import React from 'react';
import { Carousel } from 'antd';
import { Tabs } from "antd";
import { Table } from "antd";

const { TabPane } = Tabs;

const columns = [
    {
        title: "Name",
        dataIndex: "name",
        align: "center",
        width: 150
    },
    {
        title: "Age",
        dataIndex: "age",
        align: "center",
        width: 150
    },
    {
        title: "Address",
        align: "center",
        dataIndex: "address"
    }
];

// Antd desgin Tabs https://mobile.ant.design/components/tabs
// See CodeSandbox https://codesandbox.io/s/elated-wood-r1xbs?file=/index.js:733-1754
// CodeSandBox scroll example https://codesandbox.io/s/naughty-moser-h7u33?file=/index.js
const TabsHeightTestingComponent = () => {
    const dataTable1 = [];
    for (let i = 0; i < 6; i++) {
        dataTable1.push({
            key: i,
            name: `King Ludwig II ${i}`,
            age: 32,
            address: `Regensburg , Munich Strassen. ${i}`
        });
    }

    return (
        <>
            <Tabs type="card" style={{ backgroundColor: "red", height: auto }}>
                <TabPane tab="Has fixed height" key="1">
                    <div >
                        <p>Start of content Tab1</p>
                        <p>data...</p>
                        <p>data...</p>
                        <p>data...</p>
                        <p>data...</p>
                        <p>data...</p>
                        <p>data...</p>
                        <p>data...</p>
                        <p>data...</p>
                        <p>data...</p>
                        <p>data...</p>
                        <p>End of content Tab1</p>
                    </div>
                </TabPane>
                <TabPane tab="Should autosize height after Tab1" key="2">

                    <Table
                        columns={columns}
                        dataSource={dataTable1}
                        showHeader={false}
                        bordered={true}
                        pagination={false}
                        scroll={{ y: 200 }}
                    />
                </TabPane>
            </Tabs>

            {/* Debug version with styles */}
            {/* <Tabs type="card" style={{ backgroundColor: "red", height: 200 }}>
                    <TabPane tab="Has fixed height" key="1">
                        <div style={{ backgroundColor: "green" }}>
                            <p>Start of content Tab1</p>
                            <p>data...</p>
                            <p>data...</p>
                            <p>End of content Tab1</p>
                        </div>
                    </TabPane>
                    <TabPane tab="Should autosize height after Tab1" key="2">
                <div style={{ backgroundColor: "#007FFF" }}>
                    <p>Start of content Tab2</p>
                    <Table
                        columns={columns}
                        dataSource={dataTable1}
                        showHeader={false}
                        bordered={true}
                        pagination={false}
                        scroll={{ y: 80 }}
                    />
                    <p>End of content Tab2</p>
                </div>
                </TabPane>
            </Tabs > */}
        </>
    );
}

export default TabsHeightTestingComponent;