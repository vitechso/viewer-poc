import { Tabs, Button } from 'antd';
const { TabPane } = Tabs;

const TabbedCards = ({ title, tabHeight = "auto", children }) => {
  const [position, setPosition] = React.useState(['left', 'right']);
  const OperationsSlot = {
    left: <div className="tab-bar-title">{title}</div>
  };

  const slot = React.useMemo(() => {
    return position.reduce(
      (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
      {},
    );
  }, [position]);

  return (
    <Tabs defaultActiveKey="1" type="card" tabBarExtraContent={slot} animated={false} style={{ height: tabHeight }}>
      {React.Children.map(children, (child, i) => {
        return (
          <TabPane tabKey={(i + 1).toString()} key={(i + 1).toString()}>
            {child}
          </TabPane>)
      })}
    </Tabs>
  );
}

class QLTabs extends React.Component {
  state = {
    activeTab: "1",
    tabCount: React.Children.count(this.props.children)
  };

  nextTab = () => {
    let key = parseInt(this.state.activeTab);
    console.log("activeKey is: " + key);
    console.log("tabCount is: " + this.state.tabCount);
    var nextTab = (key == this.state.tabCount ? 1 : key + 1).toString();
    console.log("setting nextTab to " + nextTab)
    this.setState({
      activeTab: nextTab
    });
  };

  previousTab = () => {
    let key = parseInt(this.state.activeTab);
    console.log("activeKey is: " + key);
    console.log("tabCount is: " + this.state.tabCount);
    var previousTab = (key == 1 ? this.state.tabCount : key - 1).toString();
    console.log("setting previousTab to: " + previousTab)
    this.setState({
      activeTab: previousTab
    });
  };

  render() {
    console.log("ActiveTab is :" + this.state.activeTab)
    return (
      <Tabs defaultActiveKey="1" activeKey={this.state.activeTab} type="card" tabBarExtraContent={<><div className="tab-bar-title">{this.props.Title}</div><Button className="tabs-extra-demo-button-l" onClick={() => this.previousTab()}>Left</Button><Button className="tabs-extra-demo-button" onClick={() => this.nextTab()}>Right</Button></>}>
        {console.log("childs: " + React.Children.count(this.props.children))}
        {React.Children.map(this.props.children, (child, i) => {
          return (
            <TabPane tabKey={(i + 1).toString()} key={(i + 1).toString()}>
              {child}
            </TabPane>)
        })}
      </Tabs>
    );
  }
}

export default TabbedCards;