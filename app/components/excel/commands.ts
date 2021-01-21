/* global console, Excel, self, window, global */

import {
  ensureStateInitialized,
  SetStartupBehaviorHelper,
  SetRuntimeVisibleHelper,
  updateRibbon,
  connectService,
  monitorSheetChanges
} from './utilities/office-apis-helpers';

export function getGlobal() {
  return typeof self !== 'undefined'
    ? self
    : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
        ? global
        : undefined;
}


const g = getGlobal() as any;

// the add-in command functions need to be available in global scope
//g.btnenableaddinstart = btnEnableAddinStart;
//g.btndisableaddinstart = btnDisableAddinStart;
//g.btninsertdata = btnInsertData;
g.btnopentaskpane = btnOpenTaskpane;
g.btnclosetaskpane = btnCloseTaskpane;
//g.btnconnectservice = btnConnectService;
//g.btndisconnectservice = btnDisconnectService;
//g.btnsumdata = btnSumData;

export function btnConnectService(event: Office.AddinCommands.Event) {
  ensureStateInitialized(false);
  console.log('Connect service button pressed');
  // Your code goes here
  g.state.setConnected(true);
  g.state.isConnectInProgress = true;
  updateRibbon();
  connectService();
  monitorSheetChanges();
  event.completed();
}
export function btnDisconnectService(event: Office.AddinCommands.Event) {
  ensureStateInitialized(false);
  console.log('Disconnect service button pressed');
  // Your code goes here
  g.state.setConnected(false);
  updateRibbon();
  event.completed();
}

export function btnOpenTaskpane(event: Office.AddinCommands.Event) {
  ensureStateInitialized(false);
  console.log('Open task pane button pressed');
  // Your code goes here
  SetRuntimeVisibleHelper(true);
  g.state.isTaskpaneOpen = true;
  updateRibbon();
  event.completed();
}

export function btnCloseTaskpane(event: Office.AddinCommands.Event) {
  ensureStateInitialized(false);
  console.log('Close task pane button pressed');
  // Your code goes here
  SetRuntimeVisibleHelper(false);
  g.state.isTaskpaneOpen = false;
  updateRibbon();
  event.completed();
}

export function btnEnableAddinStart(event: Office.AddinCommands.Event) {
  ensureStateInitialized(false);
  console.log('Enable add-in start button pressed');
  // Your code goes here
  SetStartupBehaviorHelper(true);
  g.state.isStartOnDocOpen = true;
  updateRibbon();
  event.completed();
}

export function btnDisableAddinStart(event: Office.AddinCommands.Event) {
  ensureStateInitialized(false);
  console.log('Disable add-in start button pressed');
  // Your code goes here
  SetStartupBehaviorHelper(false);
  g.state.isStartOnDocOpen = false;
  updateRibbon();

  event.completed();
}

// export function btnInsertData(event: Office.AddinCommands.Event) {
//   console.log('Insert data button pressed');
//   // Mock code that pretends to insert data from a data source
//   insertData();
//   event.completed();
// }

export async function btnSumData(event: Office.AddinCommands.Event) {
  console.log('Insert data button pressed');
  // Mock code that pretends to insert data from a data source
  let address = g.state.selectionAddress as string;
  await Excel.run(ctx => {
    let sheet = ctx.workbook.worksheets.getActiveWorksheet();
    let range = sheet.getRange(address);
    range.load('values');

    let sum: number = 0;
    return ctx.sync().then(() => {
      range.values.forEach(v => {
        let vnumber: number = +v.toString();
        sum += vnumber;
      });

      return ctx.sync().then(() => {
        let sheet = ctx.workbook.worksheets.getActiveWorksheet();

        let range = sheet.getRange('F1');
        range.values = [[sum]];
        range.format.autofitColumns();
        event.completed();
        console.log(sum);
        return ctx.sync();
      });
    });
  });
  event.completed();
}

// async function insertData() {
//   try {
//     await Excel.run(async ctx => {
//       let sheet = ctx.workbook.worksheets.getActiveWorksheet();
//       let runnersTable = sheet.tables.add('A1:F1', true /*hasHeaders*/);
//       runnersTable.name = 'RunnersTable';

//       runnersTable.getHeaderRowRange().values = [
//         ['ID', 'Name', 'Address', 'PostalCode', 'City', 'Country']
//       ];

//       runnersTable.rows.add(null /*add rows to the end of the table*/, [
//         ['020273-3349','Ari Jónsson', 'Þórsgata 11', '104', 'Rvk', "Ísl"],
//         ['030273-3349','Þari Jónsson', 'Hverfisgata 11', '104', 'Reikjavik', "Ísland"],
//         ['040273-3349','Vari Jónsson', 'Hoflandsvegur 11', '104', 'Reykjavík', "ice"],
//         ['050273-3349','Harri Jónsson', 'Óðinsgata 11', '104', 'reikjavik', "iceland"],
//         ['060273-3349','Barri Jónsson', 'Laugavegur 11', '104', 'r.vik', "Iceland"],
//         ['070273-3349','Rúrik Jónsson', 'Kambsvegur 11', '104', 'reykjavik', "ISL"],
//         ['080273-3349','Sigurður Jónsson', 'Jónsgata 11', '104', 'Reikjavik', "IS"]
//       ]);

//       if (Office.context.requirements.isSetSupported('ExcelApi', '1.2')) {
//         sheet.getUsedRange().format.autofitColumns();
//         sheet.getUsedRange().format.autofitRows();
//       }
//       ctx.sync().then(() => {
//         monitorSheetChanges();
//         return ctx.sync();
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }


export async function lookupByIdentifier(identifier: string, propertyName: string) {
  try {
    await Excel.run(async ctx => {
      const g = getGlobal() as any;
      /**
       * Insert your Excel code here
       */
      const range = ctx.workbook.getSelectedRange();

      // Read the range address
      range.load("address");

      // Update the fill color
      //range.format.fill.color = "yellow";
      range.values = [['=QL.LOOKUP(' + g.state.selectedEntity.cellAddress + ',"' + propertyName + '")']];

      await ctx.sync();
      console.log(`The range address was ${range.address}.`);
    });
  } catch (error) {
    console.error(error);
  }
}

export async function timeseriesByIdentifier(identifier: string, propertyName: string) {
  try {
    await Excel.run(async ctx => {
      /**
       * Insert your Excel code here
       */
      const range = ctx.workbook.getSelectedRange();

      // Read the range address
      range.load("address");

      // Update the fill color
      //range.format.fill.color = "yellow";
      range.values = [['=QL.TIMESERIES("' + identifier + '","' + propertyName + '")']];

      await ctx.sync();
      console.log(`The range address was ${range.address}.`);
    });
  } catch (error) {
    console.error(error);
  }
}
