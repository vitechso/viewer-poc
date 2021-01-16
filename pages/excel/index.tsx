/* eslint-disable @typescript-eslint/no-unused-vars */
/* global document, console, CustomFunctions, Excel, Office, OfficeExtension, Component */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
//import { wrapper } from '../../redux/store'
import dynamic from 'next/dynamic';
import loadOffice from '../../Components/excel/loadOffice'
import basicStyle from "@iso/assets/styles/constants";
import ExcelLayoutWrapper from "../../Components/excel/excelLayoutWrapper";
import { isServer } from '../../lib/helpers/utils'
import { emit } from "jetemit";
import { getGlobal } from '../../Components/excel/commands'
import {
    ensureStateInitialized,
    SetStartupBehaviorHelper,
    SetRuntimeVisibleHelper,
    updateRibbon,
    connectService,
    monitorSheetChanges,
    removeSetting
} from '../../Components/excel/utilities/office-apis-helpers';
import {
    fuzzy,
    lookup,
    lookups,
    timeseries,
    timeseriesfiltered,
    stream,
    validate
} from '../../Components/excel/functions';
import ExcelLayout from '../../containers-ql/DashBoardLayout/ExcelLayout';
import { useSelector } from "react-redux";

//import OfficeWrapper from '../../Components/excel/officeWrapper'

const OfficeWrapper = dynamic(() => import('../../Components/excel/officeWrapper'), {
    loading: () => <p>Loading...</p>,
    ssr: false
});

const title = 'Quick Lookup';

const index = () => {
    const [mainPageRendered, setMainPageRendered] = useState(false);

    const { rowStyle, colStyle, gutter } = basicStyle;

    useEffect(() => {
        setMainPageRendered(true);
    })

    return (
        <>
            <ExcelLayout>
                <ExcelLayoutWrapper>
                    <OfficeWrapper mainPageRendered={mainPageRendered} rowStyle={rowStyle} colStyle={colStyle} gutter={gutter}></OfficeWrapper>
                </ExcelLayoutWrapper>
            </ExcelLayout>
        </>
    )
}

function addHandlers() {
    Excel.run(function (ctx) {
        console.log("registering handler")
        ctx.workbook.worksheets.onSelectionChanged.add(onWorksheetCollectionSelectionChange);
        ctx.workbook.worksheets.onChanged.add(onWorksheetCollectionChanged)
        console.log("finished registering handler")
        return ctx.sync()
            .then(function () {
                console.log("Done registering handlers");
            });
    }).catch(errorHandlerFunction);

}

async function onWorksheetCollectionChanged(args: Excel.WorksheetChangedEventArgs)
{
    Excel.run(function (ctx) { 
        var worksheet = ctx.workbook.worksheets.getItem(args.worksheetId).load("name"); 
        return ctx.sync().then(function () { 
            var g = getGlobal() as any;
            console.log("onChanged: " + JSON.stringify(args));
            if (args.details != null && args.details.valueTypeAfter == "Empty")
            {
                console.log("removing settings for " + worksheet.name + "!" + args.address)
                removeSetting(worksheet.name + "!" + args.address);
            }    
        }); 
    }).catch(function (error) { 
    console.log(error); 
    }); 
}

async function onWorksheetCollectionSelectionChange(args: Excel.WorksheetSelectionChangedEventArgs) {
    await Excel.run(async (ctx) => {
        emit("SelectionChanged", args.address)
        console.log(`WorksheetCollection event: The address of new selection is: ${args.address}`);
    });
  }

function handleSelectionChange(event) {
    return Excel.run(function (ctx) {
        emit("SelectionChanged", event)
        return ctx.sync();
    }).catch(this.errorHandlerFunction);
}

function errorHandlerFunction(error) {
    if (error instanceof OfficeExtension.Error) {
        console.log('Error code and message: ' + error.toString());
    }
    else {
        console.log('Error code and message: ' + error);
    }
}

loadOffice(() => {
    console.log("index.tsx - loading office")
    Office.onReady(() => {
        console.log("inside Office.onReady")
        let host = Office.context.host;

        if (host === Office.HostType.Excel) {
            //g.btnsumdata = btnSumData;
            ensureStateInitialized(true);
            console.log("2. ensure state initialized from the office.initialize");
            monitorSheetChanges();
            console.log("3. after monitorSheetChanges")
            CustomFunctions.associate("FUZZY", fuzzy);
            CustomFunctions.associate("LOOKUP", lookup);
            CustomFunctions.associate("LOOKUPS", lookups);
            CustomFunctions.associate("VALIDATE", validate);
            CustomFunctions.associate("TIMESERIES", timeseries);
            CustomFunctions.associate("TIMESERIESFILTERED", timeseriesfiltered);
            CustomFunctions.associate("STREAM", stream);
            CustomFunctions.associate("METRICS", validate);
            
            console.log("4. after custom functions")
            updateRibbon();
            console.log("5. after updateRibbon")
            addHandlers();
            console.log("6. after add handlers")

        }
        console.debug("after excel part - setMainPageRendered = true");
    })
})   

export default index;