import { Transfer } from 'antd';
import AntTransfer from '@ql/styles/transfer.style';
import WithDirection from '@iso/lib/helpers/rtl';
const WDTransfers = AntTransfer(Transfer);
const Transfers = WithDirection(WDTransfers);

export default Transfers;
