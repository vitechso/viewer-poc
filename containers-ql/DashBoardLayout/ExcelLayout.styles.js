import styled from 'styled-components';
import { palette } from 'styled-theme';

const AppHolder = styled.div`
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 16px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: ${palette('primary', 0)};
  }

  .ant-layout-sider-collapsed .anticon {
    font-size: 16px;
  }

  .ant-layout-sider-collapsed .nav-text {
    display: none;
  }

  .ant-layout {
    background: ${palette('secondary', 11)};

    &.isoContentMainLayout {
      overflow: auto;
      overflow-x: hidden;
      @media only screen and (min-width: 768px) and (max-width: 1220px) {
        width: calc(100% - 64px);
        flex-shrink: 0;
      }

      @media only screen and (max-width: 767px) {
        width: 100%;
        flex-shrink: 0;
      }
    }
  }

  .isoLayoutContent {
    width: 100%;
    padding: 35px;
    background-color: #ffffff;
    border: 1px solid ${palette('border', 0)};
    height: 100%;
  }

  .isomorphicLayout {
    width: calc(100% - 240px);
    flex-shrink: 0;
    overflow-x: hidden !important;

    @media only screen and (max-width: 767px) {
      width: 100%;
    }

    @media only screen and (min-width: 768px) and (max-width: 1220px) {
      width: calc(100% - 64px);
    }
  }

  .ant-layout-footer {
    font-size: 13px;
    @media (max-width: 767px) {
      padding: 10px 20px;
    }
  }  

  // hides the "Get It" button in the Data components
  .ant-table-tbody > tr.ant-table-row-level-0 > td:nth-child(3) > span {
    visibility: hidden;
  }

  //  shows (on hover) the "Get It" button in the Data components
  .ant-table-tbody > tr.ant-table-row-level-0:hover > td:nth-child(3) > span {
      visibility: visible;
    }

    .ant-tabs-top > .ant-tabs-nav, .ant-tabs-bottom > .ant-tabs-nav, .ant-tabs-top > div > .ant-tabs-nav, .ant-tabs-bottom > div > .ant-tabs-nav
        margin-top: 0px;    
    }

    .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab, .ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab {
        color: transparent;
        background: url(/assets/icons/circle-gray.svg)  no-repeat;
        background-position: bottom;
        border: none;
        border-radius: 1px;
        padding: 0px 5px 0px 10px;       
        margin: 0 0 0 0;
        transition: none;
    }

    .ant-tabs-nav-list:nth-child(1) {
        padding-right: 15px;
    }

    .ant-tabs-nav {
        height:24px;
    }

    .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab-active, .ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab-active {
        background: url(/assets/icons/circle-black.svg)  no-repeat;
    }

    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: black;
        box-sizing: none;
    }
    .tabs-extra-demo-button {
        margin-right: 0px;
      }

    .tab-bar-title {
        margin-left: 10px;
        font-weight: 100;
        font-size: 20px;
        color: #3F6587;
    }

    .ant-tabs-nav-wrap {
        margin-top: 5px;
        display: flex; 
        justify-content: flex-end;
        height: 16px;
    }

    .ant-card-body {
        padding: 12px;
    }

    .ant-card-bordered {
        border: none;
    }

    .ant-tabs-nav {
        margin-top: 15px;
        border-bottom: none;
    }
      
    .ql-logo-box {
        margin-left:10px;
    }

    .excel-ql-logo {
        height: 0px;
    }

    .action > .ant-btn {
        padding: 0;
    }

    .ant-table-thead > tr > th {
        font-weight: 600;
        font-size:10px;
        padding: 4px 4px;
    }

    .ql-table-cell-metric {
        color: darkGray;
    }

    .ant-image-img {
        border-radius: 5px;
    }

    .ant-tabs-top > .ant-tabs-nav, .ant-tabs-bottom > .ant-tabs-nav, .ant-tabs-top > div > .ant-tabs-nav, .ant-tabs-bottom > div > .ant-tabs-nav
    {
        margin: 16px 0 0 0;
    }

    .ant-tabs-top > .ant-tabs-nav::before, .ant-tabs-bottom > .ant-tabs-nav::before, .ant-tabs-top > div > .ant-tabs-nav::before, .ant-tabs-bottom > div > .ant-tabs-nav::before
    {
        border: none;
    }

`;

export default AppHolder;
