import { InputNumber } from 'antd';
import AntInputNumber from '@ql/styles/inputNumber.style';
import WithDirection from '@ql/lib/helpers/rtl';
const WDInputnumber = AntInputNumber(InputNumber);
const Inputnumber = WithDirection(WDInputnumber);

export default Inputnumber;
