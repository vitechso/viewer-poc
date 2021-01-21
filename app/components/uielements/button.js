import { Button } from 'antd';
import { Buttons, ButtonsGroup } from '@ql/styles/button.style';
import WithDirection from '@ql/lib/helpers/rtl';
const AntButton = Buttons(Button);
const isoButton = WithDirection(AntButton);
const AntButtonGroup = ButtonsGroup(Button.Group);
const ButtonGroup = WithDirection(AntButtonGroup);

export default isoButton;
export { ButtonGroup };
