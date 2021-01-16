/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
/* global console, document, Excel, Office */
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
//import Head from "next/head"
import { Row, Col } from "antd";
import basicStyle from "../../shared/assets/styles/constants";
import MainTile from "../../Components/QL/MainTile";
import GeoLocation from "../../Components/QL/GeoLocation";
import loadOffice from '../../Components/excel/loadOffice'
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
import { on, emit } from "jetemit";
import { useSelector, useDispatch } from "react-redux";
import {
    ensureStateInitialized,
    SetStartupBehaviorHelper,
    SetRuntimeVisibleHelper,
    updateRibbon,
    connectService,
    monitorSheetChanges,
    getSetting,
    setSetting,
    removeSetting
} from "../../Components/excel/utilities/office-apis-helpers";
import { getGlobal, lookupByIdentifier, timeseriesByIdentifier } from "../../Components/excel/commands";
import QLHeader from "./QLHeader";
import placeActions from "../../redux/place/actions";
import timeseriesActions from "../../redux/timeseries/actions";

var fetchAction;
var fetchTimeSeries;

const OfficeWrapper = ({ mainPageRendered, rowStyle, colStyle, gutter }) => {
    const [isOfficeInitialized, setOfficeInitialized] = useState(false);
    const [hostIsExcel, setHostIsExcel] = useState(false);

    const data = useSelector(state => state.place.data);
    const loading = useSelector(state => state.place.loading);

    useEffect(() => {
        console.log("officeWrapper - mainPageRendered:" + mainPageRendered);
        if (mainPageRendered) {
            loadOffice(() => {
                try
                {
                    Office.onReady(() => {
                    if (mainPageRendered) {
                        console.log("host is: " + Office.context.host)
                        console.log("inside office.OnReady on officeWrapper")
                        let host = Office.context.host;

                        if(host === Office.HostType.Excel) {
                            setHostIsExcel(true);
                            ensureStateInitialized(false);
                            setOfficeInitialized(true);
                            console.log("office initialized");
                        }
                        else
                        {
                            fetchPlace({ identifier: "https://gid.is/City/Reykjavik"})
                        }
                    }

                });
                }
            catch(e)
            {
                console.error("failed to load office")
            }
            });

            on("EntityAdded", entity => {
                console.log("onEntityAdded in officeWrapper - " + JSON.stringify(entity));
                
                let g = getGlobal() as any;
                if (entity.identifier != 'N/A' && g.state.selectedEntity.identifier !== entity.identifier)
                {
                    fetchPlace(entity);
                }
                // g.state.selectedEntity.probability = entity.probability;
                // g.state.selectedEntity.name = entity.name;
                // setSetting(g.state.selectedEntity.cellAddress, JSON.stringify(g.state.selectedEntity))
                                
                // Excel.run(ctx => {
                //     var sheet = ctx.workbook.worksheets.getActiveWorksheet().load();
                //       return ctx.sync().then(function () {
                //         var entity = g.state.selectedEntity;
                //         var cellRange = sheet.getRange(entity.cellAddress)
                        
                //         if (entity.identifier !== 'N/A')
                //         {
                //             // cellRange.style = "Hyperlink";
                //             // cellRange.format.fill.color = "white"
                //             // let hyperlink = {
                //             //     textToDisplay: entity.identifier,
                //             //     address: "https://www.quicklookup.com?q=" + entity.identifier + "&probability=" + entity.probability,
                //             //     screenTip: "https://www.quicklookup.com?q=" + entity.identifier + "&probability=" + entity.probability
                //             //    };
                //             //   cellRange.hyperlink = hyperlink;
                              
    
                //             //sheet.comments.add(cellRange, "Probability is " + entity.probability)
                //             getPlace(entity.identifier);
                //             //setIdentifier(id);
                    
                //             console.log(entity.identifier);
                //         }
                //         else{
                //             cellRange.format.fill.color = "yellow"
                //         }
                //       });
                // }).catch(function (error) {
                //     console.log(error);
                // });
            });

            on("SelectionChanged", event => {
                let g = getGlobal() as any;
                    Excel.run(ctx => {
                        var _rangeSelected = ctx.workbook.getSelectedRange().load();
                        return ctx.sync().then(function () {
                            try {
                                console.log("before")
                                var setting = getSetting(_rangeSelected.address)
                                console.log("after")
                                
                                console.log("setting for address" + _rangeSelected.address + " is " + JSON.stringify(setting) )
                                if (setting != null && setting.identifier != null) {
                                    console.log("setting and identifier is not null" + setting.identifier + " selectedIdentifier is " + g.state.selectedEntity.identifier)
                                    if (setting.identifier != 'N/A' && setting.identifier != g.state.selectedEntity.identifier)
                                    {
                                        
                                        fetchPlace(setting);
                                    }
                                        
                                }
                            }
                            catch(e) {
                                console.error(e)
                            }
                            
                        });
                    }).catch(function (error) {
                        console.log(error);
                    });
                });
        }
    }, [mainPageRendered]);

    const dispatch = useDispatch();

    const getPlace = useCallback(
        identifier => {
            try {
                console.log("fetching from officeWrapper, identifier: " + identifier);
                dispatch(placeActions.fetchPlaceDataStart(identifier));
                dispatch(timeseriesActions.fetchTimeseriesDataStart(identifier,"populationTotal"));
            }
            catch(e)
            {
                console.error(e)
            }
            
        },
        [dispatch]
    );

    function fetchPlace(entity: any)
    {
        var delay = 500;
        clearTimeout(fetchAction);
        setTimeout(function() {
            var g = getGlobal() as any;
            getPlace(entity.identifier)
            if (g.state != null)
            {
                g.state.selectedEntity = entity;
            }
        },delay);

    }

    //   useEffect(() => {
    //     if (identifier)
    //         getPlace();
    //   }, [identifier]);

    return (
        <>
            {/* {!isOfficeInitialized ? (
                <div>Load the addin in excel...</div>
            ) : (
                    <> */}
                        <QLHeader></QLHeader>

                        {data && (
                            <>
                                        <MainTile />
                                        <Weather />
                                        <GeoLocation />
                                        <Events />
                                        <Demographics />
                                        <Population />
                                        <DateAndTime />
                                        <UpcomingSignificantDates />
                                {/* <Row style={rowStyle} gutter={gutter} justify="start">
            <Col md={12} xs={24} style={colStyle}>
              <UpcomingSignificantDates />
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
              <IdentifierList />
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
          </Row> */}
                            {/* </>
                        )} */}
                    </>
                )}
        </>
    );
};

export default OfficeWrapper;
