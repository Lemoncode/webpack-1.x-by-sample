# React

In this demo we will add support for [React](https://facebook.github.io/react/).

We will start from sample
[00 Intro / 03 Ouput](https://github.com/Lemoncode/webpack-1.x-by-sample/tree/master/00%20Intro/03%20Output)
, install React locally, update the *students.js* to use **_jsx_** syntax and include
some basic rendering, install
[*babel-preset-react*](https://github.com/babel/babel/tree/master/packages/babel-preset-react)
and set it up in *webpack.config.js*.


Summary steps:
 - Install React as a local dependency.
 - Add an entry point for our React app in *index.html*.
 - Update *students.js* to *students.__jsx__* and its content.
 - Install [*babel-preset-react*](https://github.com/babel/babel/tree/master/packages/babel-preset-react)
 so *babel* can resolve *jsx* files.
 - Add the proper configuration in *webpack.config.js*.
 


# Steps to build it

## Prerequisites

Prerequisites, you will need to have [Node.js](https://nodejs.org) installed in your
computer. If you want to follow this guide you will need to take as starting point 
sample [00 Intro / 03 Ouput](https://github.com/Lemoncode/webpack-1.x-by-sample/tree/master/00%20Intro/03%20Output).

## steps

- React is an open source library for building user interfaces (quite popular
  nowdays), let's start by installing the library (*react* and *react-dom*).


```
npm install react --save
npm install react-dom --save
```

- In the *index.html* file let's add a `<div>` that will be the entry
point for our React app.

```html
<body>
  Hello webpack !
  <div id="root">
  </div>
</body>
```

- Let's rename *students.js* to *students.__jsx__* and update the code to use React.

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {getAvg} from './averageService';


const AverageUi = React.createClass({

  getInitialState: function () {
    return { scores: [90, 75, 60, 99, 94, 30], average: 0 };
  },

  componentDidMount: function () {
    this.setState({ average: getAvg(this.state.scores) });
  },

  render: function () {
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

- For *babel* to parse React *jsx* files we need to install
[*babel-preset-react*](https://github.com/babel/babel/tree/master/packages/babel-preset-react).

```
npm install babel-preset-react --save-dev
```

- It's time to update *webpack.config.js*, we will start by adding the *jsx* extension
and update the entry point, *students.jsx*.

```
module.exports = {
  entry: ['./students.jsx'],
```

- In the loaders section we need to indicate to *babel-loader* that it should take
into account not only *js* but _**jsx**_, and that it should take into account
React preset.

```
module: {
  loaders: [
    {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }
  ]
```

- Finally if we run the app we will see the React based functionallity in action.

![Demo02_01_React.png](../../99 Readme Resources/02 Webpack/Demo02_01_React.png "Demo02_01_React.png")
