// @ts-nocheck
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { Row, Col } from "antd";
import basicStyle from "@ql/styles/constants";
import LayoutWrapper from "@ql/components/utility/layoutWrapper";
import DashboardLayout from "@ql/containers/DashBoardLayout/DashboardLayout";
import { useSelector, useDispatch } from "react-redux";
import placeActions from "@ql/redux/place/actions";
import timeseriesActions from "@ql/redux/timeseries/actions";
import MainTile from "@ql/components/QL/MainTile";
import GeoLocation from "@ql/components/QL/GeoLocation";
import RelationsGraph from "@ql/components/QL/RelationsGraph";
import AvailableTimeSeries from "@ql/components/QL/AvailableTimeSeries";
import StatisticsViewer from "@ql/components/QL/StatisticsViewer";
import StatisticalOverView from "@ql/components/QL/StatisticalOverView";
import Events from "@ql/components/QL/Events";
import SpecialDays from "@ql/components/QL/SpecialDays";
import UpcomingSignificantDates from "@ql/components/QL/UpcomingSignificantDates";
import DateAndTime from "@ql/components/QL/DateAndTime";
import IdentifierList from "@ql/components/QL/IdentifierList";
import MainListTile from "@ql/components/QL/MainListTile";
import Weather from "@ql/components/QL/Weather";
import Demographics from "@ql/components/QL/Demographics";
import Population from "@ql/components/QL/Population";

const ShowJsonFromQLApi = dynamic(() => import("@ql/components/Common/Code"), { ssr: false });

const place = () => {
  const router = useRouter();
  const { id } = router.query;

  const data = useSelector(state => state.place.data);

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
