import { Select } from 'antd';
import { AntSelect } from './Select.style';

const WDSelect = AntSelect(Select);
const isoSelect = WDSelect;
const SelectOption = Select.Option;

export default isoSelect;
export { SelectOption };
