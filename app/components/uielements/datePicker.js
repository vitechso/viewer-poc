import { DatePicker } from 'antd';
import AntDatePicker from '@ql/styles/datePicker.style';

const Datepicker = AntDatePicker(DatePicker);
const DateRangepicker = AntDatePicker(DatePicker.RangePicker);

export default Datepicker;
export { DateRangepicker };
