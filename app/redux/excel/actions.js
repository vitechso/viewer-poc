const excelActions = {
  SET_EXCEL_INITIALIZED: 'SET_EXCEL_INITIALIZED',
  setExcelInitialized: (isInitialized) => ({
    type: excelActions.SET_EXCEL_INITIALIZED,
    payload: isInitialized,
  }),
};

export default excelActions;
