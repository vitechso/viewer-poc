import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import basicStyle from '@iso/assets/styles/constants';
import { Typography, Divider } from 'antd';
const { Title, Paragraph, Text } = Typography;

import { Drawer, Button } from 'antd';

// Andt desgin Drawer https://ant.design/components/drawer/
const DrawerComponent = () => {
    const data = useSelector((state) => state.place.data);
    const { rowStyle, colStyle, gutter } = basicStyle;

    const [visibleDrawer, setVisibleDrawer] = useState({
        visible: true, // If we start with true we can togle visible to true, but the UI doesn't change.
    });

    const showTheDrawer = () => {
        setVisibleDrawer({
            visible: true
        });
    };

    const onClose = () => {
        setVisibleDrawer({
            visible: false
        });
    };

    return (
        <div className="site-drawer-render-in-current-wrapper">
            Render in this
            <div style={{ marginTop: 16 }}>
                <Button type="primary" onClick={showTheDrawer}>Open</Button>
            </div>

            <h1>The CSS to toggle the drawer: {JSON.stringify(visibleDrawer)}</h1>

            <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visibleDrawer}
                getContainer={false}
                style={{ position: 'absolute' }}>
                <p>Some contents...</p>
            </Drawer>
        </div>
    );
}

export default DrawerComponent;