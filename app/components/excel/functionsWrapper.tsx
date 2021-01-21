import { fuzzy, lookup, lookups, timeseries, timeseriesfiltered, validate } from './functions';

Office.initialize = async () => {
    console.log("ensure state initialized from the office.initialize");

    /**
     * Defines the implementation of the custom functions
     * for the function id defined in the metadata file (functions.json).
     */
    CustomFunctions.associate("FUZZY", fuzzy);
    CustomFunctions.associate("LOOKUP", lookup);
    CustomFunctions.associate("LOOKUPS", lookups);
    CustomFunctions.associate("VALIDATE", validate);
    CustomFunctions.associate("TIMESERIES", timeseries);
    CustomFunctions.associate("TIMESERIESFILTERED", timeseriesfiltered);
    CustomFunctions.associate("METRICS", validate);
};

const FunctionsWrapper = () => {
    return (<div>Hello Wrapper</div>)} 

export default FunctionsWrapper;