import React, { Component } from 'react';
import './App.less';
import {Charts} from "ant-design-pro";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Charts.ChartCard
              title="测试"
              total={10}
              contentHeight={46}
          >
          </Charts.ChartCard>
      </div>
    );
  }
}

export default App;
