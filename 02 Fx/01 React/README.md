# Modules Sample

In this demo we will add support for react.

We will start from sample 00 Intro/03 Ouput, install react locally, update the students.js to jsx and include some basic rendering.


Summary steps:
 - Install reactjs as a local dependency.
 - Update students.js to students.jsx and update content.
 - Let's resolve the jsx extensions and point out the the entry
point has changed
 - Configure the webpack.config.js to  support jsx (loader)



# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you
want to follow this step guides you will need to take as starting point sample "00 Intro/03 Ouput"

## steps

- React is an open source library for building interfaces (quite popular
  nowdays), let's start by installing the library (react and react-dom).


````
npm install react --save
npm install react-dom --save
````

- In the index.html file let's add a div that will be the entry point for our react app.

<body>
  Hello webpack !
  <div id="root">
  </div>
</body>


- Let's rename students.js to jsx and update the code to use reactjs.

```javascript
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
```

- For babel to parse react jsx file we need to install babel-preset-react

````
npm install babel-preset-react --save-dev
````

- It's time to update webpack.config.js, we will start by adding the jsx extension
and update the entry point (students.jsx).

````
module.exports = {
	resolve: {
	      extensions: ['', '.js', '.ts']
	},
	entry: ["./students.jsx"],
````

- In the loaders section we need to indicate to babel-loader that it should take
into account not only js but jsx, and that it should take into account react
preset.

````
module: {
  loaders: [
    {
      test: /\.(js|jsx)$/,
      loader: "babel-loader",
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }
  ]
````

- If we run the app we will see the react based functionallity in action.

![Demo02_01_React.png](../../../99 Readme Resources/02 Webpack/Demo02_01_React.png "Demo02_01_React.png")
