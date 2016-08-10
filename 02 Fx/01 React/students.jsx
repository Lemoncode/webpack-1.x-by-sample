import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {getAvg} from "./averageService"


var AverageUi = React.createClass({

  getInitialState: function() {
      return {scores: [90, 75, 60, 99, 94, 30], average: 0};
  },

  componentDidMount: function() {
    this.setState({average: getAvg(this.state.scores)});
  },

  render: function() {
    return (
      <div>
        <span>Students average: {this.state.average}</span>
      </div>
    );
  }
});

ReactDOM.render(
  <div>
    Hello from react dom
    <AverageUi/>
  </div>
, document.getElementById('root'));
