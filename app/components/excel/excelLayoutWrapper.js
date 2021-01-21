import React from 'react';
import { ExcelLayoutContentWrapper } from '@ql/styles/excelLayoutWrapper.style';

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
