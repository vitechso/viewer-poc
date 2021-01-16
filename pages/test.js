import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import placeActions from "../redux/place/actions";
import { useRouter } from "next/router";
import Head from 'next/head';
import TestComponent from "../Components/Testing/TestComponent"
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import DashboardLayout from '../containers-ql/DashBoardLayout/DashboardLayout';
import { Row, Col } from "antd";
import basicStyle from "@iso/assets/styles/constants";
import GeoLocation from "../Components/QL/GeoLocation";

// A test page with dashboardlayout
const test = () => {
    const router = useRouter();
    const { id } = router.query;

    const data = useSelector(state => state.place.data);
    const loading = useSelector(state => state.place.loading);

    const dispatch = useDispatch();

    const getPlace = useCallback(() => {
        return dispatch(placeActions.fetchPlaceDataStart("Reykjavik"));
    }, [dispatch]);

    useEffect(() => {
        getPlace();
    }, [getPlace]);

    const { rowStyle, colStyle, gutter } = basicStyle;

    return (
        <>
            <Head>
                <title>Test the TestComonent page</title>
            </Head>
            <DashboardLayout>
                <LayoutWrapper>
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col md={24} xs={24} style={colStyle}>
                            <GeoLocation />
                        </Col>
                    </Row>
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col md={24} xs={24} style={colStyle}>
                            <TestComponent />
                        </Col>
                    </Row>
                </LayoutWrapper>
            </DashboardLayout>
        </>
    );
};

export default test;