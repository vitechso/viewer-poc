import { Tabs } from 'antd';
import AntTab from '@ql/styles/tab.style';
import WithDirection from '@ql/lib/helpers/rtl';
const WDTabs = AntTab(Tabs);
const TabPane = Tabs.TabPane;
const isoTabs = WithDirection(WDTabs);

export default isoTabs;
export { TabPane };
