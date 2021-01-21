import { AutoComplete } from 'antd';
import { AntAutoComplete } from '@ql/styles/autoComplete.style';
import WithDirection from '@ql/lib/helpers/rtl';
const WDAutoCompletes = AntAutoComplete(AutoComplete);
const AutoCompletes = WithDirection(WDAutoCompletes);
const AutoCompleteOption = AutoComplete.Option;

export default AutoCompletes;
export { AutoCompleteOption };
