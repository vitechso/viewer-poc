import styled from 'styled-components';
import { palette } from 'styled-theme';
import { borderRadius } from '@ql/lib/helpers/style_utils';

const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  overflow: hidden;
  border: 1px solid ${palette('border', 2)};
  padding: 0px 0px 30px;

  .isoCardImage {
    width: 100%;;
    height: 100%;;
    display: -webkit-inline-flex;
    display: -ms-inline-flex;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-bottom: 35px;
    ${borderRadius('0%')};

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .isoCardLogo {
    width: 30px;
    height: 45px;
    display: -webkit-inline-flex;
    display: -ms-inline-flex;
    display: inline-flex;
    align-items: start;
    justify-content: start;
    margin-bottom: 20px;
    ${borderRadius('30%')};
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .isoCardBody {
    align-items: center;
    display: flex;
    width: 100%;
    flex-direction: column;
    text-align: center;

    .isoName {
      font-size: 17px;
      color: ${palette('text', 0)};
      font-weight: 400;
      margin: 0 0 5px;
      line-height: 1.2;
    }

    .isoDesgTitle {
      font-size: 13px;
      color: ${palette('text', 2)};
      font-weight: 400;
      margin: 0;
      line-height: 1.2;
    }

    .isoDescription {
      font-size: 13px;
      color: ${palette('text', 2)};
      font-weight: 400;
      margin: 20px 0 0 0;
      line-height: 1.5;
    }

    .isoSocialWidgetWrapper {
      margin-top: 25px;
    }
  }

  // Drawer styles https://ant.design/components/drawer/
  .site-drawer-render-in-current-wrapper {
    width: 100%;
    height: 100%;
    padding: 10px;
    overflow: hidden;
    text-align: center;
    background: #fafafa;
    border: 1px solid #ebedf0;
    border-radius: 2px;
    }
`;

export { CardWrapper };
