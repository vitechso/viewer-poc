/* global console, location, localStorage, Excel, Office, OfficeRuntime */

import { getGlobal } from '../commands';

export const SetRuntimeVisibleHelper = (visible: boolean) => {
  let p: any;
  if (visible) {
    p = Office.addin.showAsTaskpane();
  } else {
    p = Office.addin.hide();
  }

  return p
    .then(() => {
      return visible;
    })
    .catch(error => {
      return error.code;
    });
};

export const SetStartupBehaviorHelper = (isStarting: boolean) => {
  console.log("inside setStartupBehaviourHelper")
    //if (isStarting) {
    Office.addin.setStartupBehavior(Office.StartupBehavior.load);
  //} else {
    //Office.addin.setStartupBehavior(Office.StartupBehavior.none);
  //}
  let g = getGlobal() as any;
  g.isStartOnDocOpen = isStarting;
};

export function updateRibbon() {
  console.log("inside updateRibbon")
    // Update ribbon based on state tracking
  const g = getGlobal() as any;

  // @ts-ignore
//   OfficeRuntime.ui
//     .getRibbon()
//     // @ts-ignore
//     .then(ribbon => {
//       ribbon.requestUpdate({
//         tabs: [
//           {
//             id: 'ShareTime',
//             controls: [
//             //   {
//             //     id: 'BtnConnectService',
//             //     enabled: !g.state.isConnected
//             //   },
//             //   {
//             //     id: 'BtnDisConnectService',
//             //     enabled: g.state.isConnected
//             //   },
//             //   {
//             //     id: 'BtnInsertData',
//             //     enabled: g.state.isConnected
//             //   },
//             //   {
//             //     id: 'BtnSumData',
//             //     enabled: g.state.isSumEnabled
//             //   },
//             //   {
//             //     id: 'BtnEnableAddinStart',
//             //     enabled: !g.state.isStartOnDocOpen
//             //   },
//             //   {
//             //     id: 'BtnDisableAddinStart',
//             //     enabled: g.state.isStartOnDocOpen
//             //   },
//               {
//                 id: 'BtnOpenTaskpane',
//                 enabled: !g.state.isTaskpaneOpen
//               }
//               ,
//               {
//                 id: 'BtnCloseTaskpane',
//                 enabled: g.state.isTaskpaneOpen
//               }
//             ]
//           }
//         ]
//       });
//     });
}

/*
    Managing the dialogs.
*/

// const dialogConnectUrl: string =
// //   location.protocol +
// //   '//' +
// //   location.hostname +
// //   (location.port ? ':' + location.port : '') +
//   'https://localhost:8800/login/connect.html';

export async function connectService() {
  //pop up a dialog
  let connectDialog: Office.Dialog;

  const processMessage = () => {
    g.state.setConnected(true);
    g.state.isConnectInProgress = false;
    connectDialog.close();
  };

  let g = getGlobal() as any;
  g.state.setConnected(true);
    g.state.isConnectInProgress = false;
//   await Office.context.ui.displayDialogAsync(
//     dialogConnectUrl,
//     { height: 40, width: 30, promptBeforeOpen: false },
//     result => {
//       if (result.status === Office.AsyncResultStatus.Failed) {
//         console.log(`${result.error.code} ${result.error.message}`);
//         g.state.setConnected(false);
//       } else {
//         connectDialog = result.value;
//         connectDialog.addEventHandler(
//           Office.EventType.DialogMessageReceived,
//           processMessage
//         );
//       }
//     }
//   );
}

export function generateCustomFunction(selectedOption: string) {
  try {
    Excel.run(async ctx => {
      /**
       * Insert your Excel code here
       */
      let range = ctx.workbook.getSelectedRange();

      //let selectedOption = 'Communications';

      range.values = [['=QL.GETDATA("' + selectedOption + '")']];
      range.format.autofitColumns();
      return ctx.sync();
    });
  } catch (error) {
    console.error(error);
  }
}

//This will check if state is initialized, and if not, initialize it.
//Useful as there are multiple entry points that need the state and it is not clear which one will get called first.
export function ensureStateInitialized(isOfficeInitializing: boolean) {
  console.log('ensureInitialize called');
  let g = getGlobal() as any;
  SetStartupBehaviorHelper(true);
  let initValue = false;
  if (isOfficeInitializing) {
    console.log("inside isOfficeInitializing");
    //we are being called in response to Office Initialize
    if (g.state !== undefined) {
      if (g.state.isInitialized === false) {
        g.state.isInitialized = true;
      }
    }
    if (g.state === undefined) {
      initValue = true;
    }
  }

  console.log("state is " + g.state)
  console.log("before checking state undefined " + g.state)
  if (g.state === undefined) {
    console.log("state is not undefined - setting!");
    g.state = {
      isStartOnDocOpen: true,
      isSignedIn: false,
      isTaskpaneOpen: false,
      isConnected: true,
      isSyncEnabled: false,
      isConnectInProgress: false,
      isFirstSyncCall: true,
      isSumEnabled: false,
      isInitialized: initValue,
      selectedEntity: {
        cellAddress: '',
        name: '',
        probability: 0,
        identifier: ''
      },
      updateRct: () => {},
      setTaskpaneStatus: (opened: boolean) => {
        g.state.isTaskpaneOpen = opened;
        updateRibbon();
      },
      setConnected: (connected: boolean) => {
        g.state.isConnected = connected;

        if (connected) {
          if (g.state.updateRct !== null) {
            g.state.updateRct('true');
          }
        } else {
          if (g.state.updateRct !== null) {
            g.state.updateRct('false');
          }
        }
        updateRibbon();
      }
    };
    // console.log("init value:" + initValue);
    // console.log("is initialized: " + g.state.isInitialized);
     //monitorSheetChanges();

     let addinState = Office.addin.getStartupBehavior().then((state) => {
        console.log('load state is:');
        console.log('load state' + addinState);
        if (state === Office.StartupBehavior.load) {
          g.state.isStartOnDocOpen = true;
        }
       if (localStorage.getItem('loggedIn') === 'yes') {
         g.state.isSignedIn = true;
       }
     });
     
  }
  updateRibbon();
}

async function onTableSelectionChange(event) {
  let g = getGlobal() as any;
  return Excel.run(ctx => {
    return ctx.sync().then(() => {
      console.log('Table section changed...');
      console.log('Change type of event: ' + event.changeType);
      console.log('Address of event: ' + event.address);
      console.log('Source of event: ' + event.source);
      g.state.selectionAddress = event.address;
      if (event.address === '' && g.state.isSumEnabled === true) {
        g.state.isSumEnabled = false;
        updateRibbon();
      } else if (g.state.isSumEnabled === false && event.address !== '') {
        g.state.isSumEnabled = true;
        updateRibbon();
      }
    });
  });
}

export async function monitorSheetChanges() {
  try {
    let g = getGlobal() as any;
    /*if (g.state === undefined) {
      return;
    }
    if (g.state.isInitialized) {
      await Excel.run(async ctx => {
        let table = ctx.workbook.tables.getItem('RunnersTable');
        if (table !== undefined) {
          table.onSelectionChanged.add(onTableSelectionChange);
          await ctx.sync();
          updateRibbon();
        } else {
          g.state.isSumEnabled = false;
          updateRibbon();
        }
      });
    }*/
  } catch (error) {
    console.error(error);
  }
}

export function getSetting(key){
    try{
        console.log("getting settings for " + key);
        let setting = Office.context.document.settings.get(key)
        console.log("setting is: " + setting)
        return JSON.parse(setting);
    }
    catch(e)
    {
        console.log("error parsing json: " + e);
        return null
    }
}

export function removeSetting(key){
    Office.context.document.settings.remove(key);
}

export function setSetting(key, value){
    console.log("setting key: " + key + " with value:" + value)
    Office.context.document.settings.set(key, value);
}

export function saveSettings()
{
    Office.context.document.settings.saveAsync(function (asyncResult) {
        console.log('Settings saved with status: ' + asyncResult.status);
    });
}

export async function lookupByIdentifier(identifier: string, propertyName: string) {
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
            range.values = [['=QL.LOOKUP("' + identifier + '","' + propertyName + '")']];

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

/////////////////////// Store and retrieve settings from the OfficeRuntime Storage //////////////////////

/**
 * Gets a Value from the OfficeRuntime.Storage
 * @customfunction
 * @param key key to store
 * @param value value to store
 */
export function storeValue(key, value) {
    return OfficeRuntime.storage.setItem(key, value).then(function (result) {
        return "Success: Item with key '" + key + "' saved to storage, result: " + result;
    }, function (error) {
        return "Error: Unable to save item with key '" + key + "' to storage. " + error;
    });
}

/**
 * Gets a Value from the OfficeRuntime.Storage
 * @customfunction
 * @param key key to get from storage
 */
export function getValue(key) {
    return OfficeRuntime.storage.getItem(key);
}

/**
 * Get value for key
 * @customfunction
 * @param key The key
 * @returns The value for the key.
 */
export function getValueForKeyCF(key: string): string {
    return getValueForKey(key);
}

/**
 * Get value for key
 * @customfunction
 * @param key The key
 * @returns The value for the key.
 */
export function setValueForKeyCF(key: string, value: string): string {
    setValueForKey(key, value);
    return "Stored key/value pair";
}

/***
 * Stores the key/value pair. Will use local storage or global variable to store
 * the values depending on which type the user selected.
 * 
 * @export
 * @param {string} key The key to store.
 * @param {string} value The value to store.
 */
export function setValueForKey(key: string, value: string): void {
    let g = getGlobal() as any;
    if (g.state.storageType === "globalvar") {
      g.state.keys.push(key);
      g.state.values.push(value);
    } else {
      g.window.localStorage.setItem(key, value);
    }
  }
  

  /**
   * Gets the value for the given key from storage. Will retrieve the value
   * from local storage or global variable depending on which type of storage
   * the user selected.
   *
   * @export
   * @param {string} key The key to retrieve the value for
   * @returns {string} The value
   */
  export function getValueForKey(key: string): string {
    let g = getGlobal() as any;
    let answer = "";
    if (g.state.storageType === "globalvar") {
      g.state.keys.forEach((element, index) => {
        if (element === key) {
          answer = g.state.values[index];
        }
      });
    } else {
      answer = g.window.localStorage.getItem(key);
    }
    return answer;
  }
  