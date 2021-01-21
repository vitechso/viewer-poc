/* global console, OfficeRuntime, Headers, Promise, fetch, CustomFunctions, setTimeout */

import { getGlobal } from './commands';
import { emit } from "jetemit";
import {
    getSetting,
    setSetting,
    saveSettings
} from "./utilities/office-apis-helpers";

//////////////////////// Quick Lookup Excel functions ////////////////////////////////

export class Entity {
    public id: string;
    public type: string;
    public name: string;
    public probability: number;
    public status: boolean;

    constructor(id, type, name, probability, status) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.probability = probability;
        this.status = status;
    }
}

/**
 * * Fuzzy Matching
 * @customfunction
 * @param {string} lookupValue Value to lookup
 * @param {string} lookupType Type to lookup
 * @param {string} [additionalContext] Additional context
 * @param {CustomFunctions.Invocation} invocation Invocation object. 
 * @requiresAddress 
 */
export function fuzzy(entityType, lookupValue, additionalContext, invocation: CustomFunctions.Invocation) {
    console.debug("entering fuzzy");
    const g = getGlobal() as any;
    let result;
    if (g.state.isConnected) {
        console.info("am connected");
        console.info("entityType is: " + entityType)
        console.info("lookupValue is:" + lookupValue)
        console.info("calling from :" + invocation.address)
        g.state.selectedEntity.cellAddress = invocation.address;

        // var ctx = new Excel.RequestContext();
        // console.debug("have context");
        // var range = ctx.workbook.worksheets.getActiveWorksheet().getRange("J18");
        // range.load();
        // ctx.sync();
        // console.debug(JSON.stringify(range));
        // //let comments = ctx.workbook.comments;
        // console.debug("after comments: " + JSON.stringify(range));
        // //comments.add("Sheet1!J18", "Probability:100")
        // console.debug("after comments add");

        result = _pushOperation(
            "fuzzy",
            [entityType, lookupValue, additionalContext, invocation.address]);

        return result;

    } else {
        // @ts-ignore
        Console.error("Not Connected!")
        throw new CustomFunctions.Error(CustomFunctions.ErrorCode.notAvailable);
    }


}

/** @CustomFunction 
 * @description Increments the cell with a given amount at a specified interval in milliseconds.
 * @param {number} amount - The amount to add to the cell value on each increment.
 * @param {number} interval - The time in milliseconds to wait before the next increment on the cell.
 * @param {CustomFunctions.StreamingInvocation<number>} invocation - Parameter to send results to Excel
 *     or respond to the user canceling the function.
 * @returns An incrementing value.
 */
export function stream(entity: string, propertyName: string, interval: number, invocation: CustomFunctions.StreamingInvocation<number>): void {
    var baseValue = 0;
    console.log("entering stream, entity is: " + entity);
    console.log(JSON.stringify(invocation))
    var timer = setInterval(function () {


        var icelandic = ["Reykjavík", "Reykjavik", "Iceland", "Ísland"];
        var british = ["London", "United Kingdom"];
        var swedish = ["Sweden", "Stockholm"];
        var norwegian = ["Norway", "Oslo"];
        var danish = ["Copenhagen", "Denmark"];
        var american = ["USA", "United States of America", "America"];
        if (baseValue === 0) {
            if (icelandic.includes(entity)) {
                baseValue = 1;
            }
            else if (british.includes(entity)) {
                baseValue = 172;
            }
            else if (american.includes(entity)) {
                baseValue = 127;
            }
            else if (danish.includes(entity)) {
                baseValue = 20;
            }
            else if (swedish.includes(entity)) {
                baseValue = 15;
            }
            else if (norwegian.includes("entities")) {
                baseValue = 14;
            }
            else {
                // euro
                baseValue = 155;
            }
        }
        baseValue = baseValue == 1 ? 1 : genRand(baseValue - 0.1, baseValue + 0.1, 2)
        invocation.setResult(baseValue);
    }, interval < 2000 ? 2000 : interval);
    invocation.onCanceled = function () {
        clearInterval(timer);
    };
}

function genRand(min, max, decimalPlaces) {
    return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
}


/**
 * * Lookup a value
 * @customfunction
 * @param entity resolvedEntity
 * @param propertyName property
 * @param {CustomFunctions.Invocation} invocation Invocation object. 
 * @requiresParameterAddresses
 */
export function lookup(entity: string, propertyName: string, invocation: CustomFunctions.Invocation) {

    console.log("inside lookup")
    var address = invocation.parameterAddresses[0];
    console.log("parameterAddress is: " + address);
    var settings = getSetting(address);

    console.log("looking up: " + settings.identifier + "with propertyName: " + propertyName)

    let result = _pushOperation(
        "lookup",
        [settings != null ? settings.identifier : entity, propertyName]
    );


    return result;
}

/**
 * * Lookup values
 * @customfunction
 * @param entity entity to lookup
 * @param propertyName the name of the property to retrieve values from
 * @returns {string[][]} A dynamic array with multiple results.
 */
export function lookups(entity: string, propertyName: string) {
    return _pushOperation(
        "lookups",
        [entity, propertyName]
    );
}

/**
 * * Validate
 * @customfunction
 * @param entity entity to lookup
 * @returns string True or false
 */
export function validate(entity: string) {
    return _pushOperation(
        "validate",
        [entity]
    );
}

/**
 * * Get Time Series
 * @customfunction
 * @param entity entity to lookup
 * @param propertyName the name of the property to retrieve value from
 * @param {CustomFunctions.Invocation} invocation Invocation object. 
 * @requiresParameterAddresses
 * @returns {string[][]} A dynamic array with multiple results.
 */
export function timeseries(entity: string, propertyName: string, invocation: CustomFunctions.Invocation) {
    console.log("inside timeseries")
    var address = invocation.parameterAddresses[0];
    console.log("parameterAddress is: " + address);
    var settings = getSetting(address);

    return _pushOperation(
        "timeseries",
        [settings != null ? settings.identifier : entity, propertyName]
    );
}

/**
 * * Get Time Series With Filter
 * @customfunction
 * @param entity entity to lookup
 * @param propertyName the name of the property to retrieve value from
 * @param rangeFrom the lower range to include results from
 * @param rangeTo the upper range to include results from
 * @param fetchHeaders fetch the headers for the results
 * @param {CustomFunctions.Invocation} invocation Invocation object. 
 * @requiresParameterAddresses
  * @returns {string[][]} A dynamic array with multiple results.
 */
export function timeseriesfiltered(entity: string, propertyName: string, rangeFrom: string, rangeTo: string, fetchHeaders: boolean = false, invocation: CustomFunctions.Invocation) {
    console.log("inside timeserisfiltered")
    var address = invocation.parameterAddresses[0];
    console.log("parameterAddress is: " + address);
    var settings = getSetting(address);

    console.log("looking up: " + settings.identifier + "with propertyName: " + propertyName)

    return _pushOperation(
        "timeseriesfiltered",
        [settings.identifier, propertyName, rangeFrom, rangeTo, fetchHeaders]
    );
}

/**
 * * Metrics for the current ql session
 * @customfunction
 * @returns {string[][]} A dynamic array with multiple results.
 */
export function metrics() {
    return [
        ['apples', 1, 'pounds'],
        ['oranges', 3, 'pounds'],
        ['pears', 5, 'crates']
    ];
}

/////////////////////// Batch working ///////////////////////////////////////

// Next batch
interface IBatchEntry {
    operation: string;
    args: any[];
    resolve: (data: any) => void;
    reject: (error: Error) => void;
}
/*
interface IServerResponse {
  result?: any;
  error?: string;
}*/

const _batch: IBatchEntry[] = [];
let _isBatchedRequestScheduled = false;

// This function encloses your custom functions as individual entries,
// which have some additional properties so you can keep track of whether or not
// a request has been resolved or rejected.
function _pushOperation(op: string, args: any[]) {
    // Create an entry for your custom function.
    const invocationEntry: IBatchEntry = {
        operation: op, // e.g. sum
        args: args,
        resolve: undefined,
        reject: undefined,
    };

    // Create a unique promise for this invocation,
    // and save its resolve and reject functions into the invocation entry.
    const promise = new Promise((resolve, reject) => {
        invocationEntry.resolve = resolve;
        invocationEntry.reject = reject;
    });

    // Push the invocation entry into the next batch.
    _batch.push(invocationEntry);

    // If a remote request hasn't been scheduled yet,
    // schedule it after a certain timeout, e.g. 100 ms.
    if (!_isBatchedRequestScheduled) {
        _isBatchedRequestScheduled = true;
        setTimeout(_makeRemoteRequest, 1000);
    }

    // Return the promise for this invocation.
    return promise;
}

// This is a private helper function, used only within your custom function add-in.
// You wouldn't call _makeRemoteRequest in Excel, for example.
// This function makes a request for remote processing of the whole batch,
// and matches the response batch to the request batch.
function _makeRemoteRequest() {
    // Copy the shared batch and allow the building of a new batch while you are waiting for a response.
    // Note the use of "splice" rather than "slice", which will modify the original _batch array
    // to empty it out.
    const batchCopy = _batch.splice(0, _batch.length);
    _isBatchedRequestScheduled = false;

    // Build a simpler request batch that only contains the arguments for each invocation.
    const requestBatch = batchCopy.map((item) => {
        let result = item.operation;
        item.args.forEach(a => {
            result = result + "|" + a;
        });
        return result;
    });

    // Make the remote request.

    // let queryString = requestBatch.join("&batchEntries=")
    let url = "https://api20210115154420.azurewebsites.net/api/batch";

    // let url = "https://localhost:44301/api/batch" // ?batchEntries=" + queryString;
    //let url = "https://quicklookup.local/api/batch" // ?batchEntries=" + queryString;
    //let url = "https://quicklookupapiapp.azurewebsites.net/api/batch?batchEntries=" + queryString;

    var myHeaders = new Headers({
        'Content-Type': 'application/json',
        'X-Api-Key': 'e74fb723-a022-4f77-a2bd-abfc0207a1b5'
    });

    console.log(requestBatch);

    fetch(url, {
        headers: myHeaders,
        method: "POST",
        body: JSON.stringify(requestBatch),
    })
        .then(res => {
            if (res.ok) return res.json();
            console.debug("bad data" + res)
            throw res;
        })
        .then(function (responseBatch) {
            let calledFuzzy = false;
            let lastFuzzy;

            responseBatch.forEach((response, index) => {
                if (response.error) {
                    console.debug("response.error=" + response.error)
                    batchCopy[index].reject(new Error(response.error));
                } else {
                    console.debug("response.requestType=" + response.requestType);
                    if (response.requestType === "lookups" || response.requestType === "timeseries" || response.requestType === "timeseriesfiltered") {
                        batchCopy[index].resolve([response.result.values]);
                    }
                    else if (response.requestType === "fuzzy") {
                        calledFuzzy = true;
                        console.log("response.requestType=" + response.requestType);
                        var identifier = response.result.identifier;
                        identifier = identifier.substring(identifier.lastIndexOf('/') + 1);
                        batchCopy[index].resolve(response.result.name);
                        try {
                            if (response.result !== undefined) {
                                console.log("1: " + JSON.stringify(response));
                                //console.log(response.result.type)
                                console.log("2: adding entity" + response.result.identifier);
                                //console.log(JSON.stringify(response));
                                //console.debug(JSON.stringify(response.result)); 

                                let entity = {
                                    identifier: response.result.identifier,
                                    probability: response.result.probability,
                                    name: response.result.name,
                                    cellAddress: batchCopy[index].args[3]
                                }

                                setSetting(entity.cellAddress, JSON.stringify(entity))

                                lastFuzzy = entity;

                            }

                        } catch (error) {
                            console.log("Error:" + error)
                        }
                    }
                    else {
                        console.log("response.requestType=" + response.requestType);
                        batchCopy[index].resolve(response.result.value);
                    }
                }
                if (calledFuzzy) {
                    emit("EntityAdded", lastFuzzy);
                    saveSettings();
                }
            });
        })
        .catch(function (error) {
            console.debug("Error: " + error);
        });
}