import React from 'react';
import { ExcelLayoutContentWrapper } from './excelLayoutWrapper.style';

export default (props) => (
  <ExcelLayoutContentWrapper
    className={
      props.className != null
        ? `${props.className} isoLayoutContentWrapper`
        : 'isoLayoutContentWrapper'
    }
    {...props}
  >
    {props.children}
  </ExcelLayoutContentWrapper>
);
