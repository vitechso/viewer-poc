/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
/* global console, document, Excel, Office */
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
//import Head from "next/head"
import { Row, Col } from "antd";
import basicStyle from "@ql/styles/constants";
import MainTile from "@ql/components/QL/MainTile";
import GeoLocation from "@ql/components/QL/GeoLocation";
import loadOffice from '@ql/components/excel/loadOffice'
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
} from "@ql/components/excel/utilities/office-apis-helpers";
import { getGlobal, lookupByIdentifier, timeseriesByIdentifier } from "@ql/components/excel/commands";
import QLHeader from "./QLHeader";
import placeActions from "@ql/redux/place/actions";
import timeseriesActions from "@ql/redux/timeseries/actions";

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
        try {
          Office.onReady(() => {
            if (mainPageRendered) {
              console.log("host is: " + Office.context.host)
              console.log("inside office.OnReady on officeWrapper")
              let host = Office.context.host;

              if (host === Office.HostType.Excel) {
                setHostIsExcel(true);
                ensureStateInitialized(false);
                setOfficeInitialized(true);
                console.log("office initialized");
              }
              else {
                fetchPlace({ identifier: "https://gid.is/City/Reykjavik" })
              }
            }

          });
        }
        catch (e) {
          console.error("failed to load office")
        }
      });

      on("EntityAdded", entity => {
        console.log("onEntityAdded in officeWrapper - " + JSON.stringify(entity));

        let g = getGlobal() as any;
        if (entity.identifier != 'N/A' && g.state.selectedEntity.identifier !== entity.identifier) {
          fetchPlace(entity);
        }
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

              console.log("setting for address" + _rangeSelected.address + " is " + JSON.stringify(setting))
              if (setting != null && setting.identifier != null) {
                console.log("setting and identifier is not null" + setting.identifier + " selectedIdentifier is " + g.state.selectedEntity.identifier)
                if (setting.identifier != 'N/A' && setting.identifier != g.state.selectedEntity.identifier) {

                  fetchPlace(setting);
                }

              }
            }
            catch (e) {
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
        dispatch(timeseriesActions.fetchTimeseriesDataStart(identifier, "populationTotal"));
      }
      catch (e) {
        console.error(e)
      }

    },
    [dispatch]
  );

  function fetchPlace(entity: any) {
    var delay = 500;
    clearTimeout(fetchAction);
    setTimeout(function () {
      var g = getGlobal() as any;
      getPlace(entity.identifier)
      if (g.state != null) {
        g.state.selectedEntity = entity;
      }
    }, delay);

  }

  return (
    <>
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
        </>
      )}
    </>
  );
};

export default OfficeWrapper;
