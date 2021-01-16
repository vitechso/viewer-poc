import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { withAuthSync } from "../../authentication/auth.utils";
import { Row, Col } from "antd";
import basicStyle from "@iso/assets/styles/constants";
import LayoutWrapper from "../../shared/components/utility/layoutWrapper";
import DashboardLayout from "../../containers-ql/DashBoardLayout/DashboardLayout";
import { useSelector, useDispatch } from "react-redux";
import placeActions from "../../redux/place/actions";
import timeseriesActions from "../../redux/timeseries/actions";
import MainTile from "../../Components/QL/MainTile";
import GeoLocation from "../../Components/QL/GeoLocation";
import RelationsGraph from "../../Components/QL/RelationsGraph";
import AvailableTimeSeries from "../../Components/QL/AvailableTimeSeries";
import StatisticsViewer from "../../Components/QL/StatisticsViewer";
import StatisticalOverView from "../../Components/QL/StatisticalOverView";
import Events from "../../Components/QL/Events";
import SpecialDays from "../../Components/QL/SpecialDays";
import UpcomingSignificantDates from "../../Components/QL/UpcomingSignificantDates";
import DateAndTime from "../../Components/QL/DateAndTime";
import IdentifierList from "../../Components/QL/IdentifierList";
import MainListTile from "../../Components/QL/MainListTile";
import Weather from "../../Components/QL/Weather";
import Demographics from "../../Components/QL/Demographics";
import Population from "../../Components/QL/Population";
//import TestComponent from "../../Components/Testing/TestComponent"

const ShowJsonFromQLApi = dynamic(() => import("../../Components/Common/Code"), { ssr: false });

const place = () => {
  const router = useRouter();
  const { id } = router.query;

  const data = useSelector(state => state.place.data);
  const loading = useSelector(state => state.place.loading);

  const dispatch = useDispatch();

  const getPlace = useCallback(
    id => {
      console.log("fetching from PLACE PAGE, identifier: " + id);
      dispatch(placeActions.fetchPlaceDataStart(id));
      dispatch(timeseriesActions.fetchTimeseriesDataStart(id, "populationTotal"));
    },
    [dispatch]
  );

  useEffect(() => {
    getPlace(id);
  }, [getPlace]);

  const { rowStyle, colStyle, gutter } = basicStyle;

  return (
    <>
      <Head>
        <title>Place page</title>
      </Head>
      <DashboardLayout>
        <LayoutWrapper>
          {/* Just for debugging*/}
          {/* <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} xs={24} style={colStyle}>
            <TestComponent />
          </Col>
        </Row> */}
          {data && (
            <>
              <Row style={rowStyle} justify="start">
                <Col md={12} xs={24} style={colStyle}>
                  <MainTile />
                </Col>
              </Row>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} xs={24} style={colStyle}>
                  <Weather />
                </Col>
              </Row>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} xs={24} style={colStyle}>
                  <GeoLocation />
                </Col>
              </Row>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} xs={24} style={colStyle}>
                  <Events />
                </Col>
              </Row>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} xs={24} style={colStyle}>
                  <Demographics />
                </Col>
              </Row>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} xs={24} style={colStyle}>
                  <Population />
                </Col>
              </Row>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} xs={24} style={colStyle}>
                  <DateAndTime />
                </Col>
              </Row>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} xs={24} style={colStyle}>
                  <UpcomingSignificantDates />
                </Col>
              </Row>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} xs={24} style={colStyle}>
                  <IdentifierList />
                </Col>
              </Row>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} xs={24} style={colStyle}>
                  <SpecialDays />
                </Col>
              </Row>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} xs={24} style={colStyle}>
                  <AvailableTimeSeries />
                </Col>
              </Row>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} xs={24} style={colStyle}>
                  <StatisticsViewer />
                </Col>
              </Row>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} xs={24} style={colStyle}>
                  <StatisticalOverView />
                </Col>
              </Row>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} xs={24} style={colStyle}>
                  <MainListTile />
                </Col>
              </Row>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} xs={24} style={colStyle}>
                  <RelationsGraph />
                </Col>
              </Row>
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={24} xs={24} style={colStyle}>
                  <ShowJsonFromQLApi />
                </Col>
              </Row>
            </>
          )}
        </LayoutWrapper>
      </DashboardLayout>
    </>
  );
};

export default place;
