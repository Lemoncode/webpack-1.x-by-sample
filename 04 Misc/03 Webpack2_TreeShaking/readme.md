# Webpack 2 Tree Shaking

On of the most interest features that ships Webpack 2 is TreeShaking: this
allows to remove from a destination bundle the exports that are not in use
by the project, reducing dramatically the site of our bundle

We are going to create a simple sample:

 - A calculator module where we create an export per basic operatin (_sum_, _substract_, _mul_, _div_..).

 - A main.js file that will import this calculator module and use only _sum_ operation.

We will use webpack's 2 tree shaking and check that we end up having a bundle that doesnt
contain the code for _substract_, _mul_, and _div_


## Steps to build it

This time we will start from scratch.

- Execute _npm init_ from the command prompt.
- Install the needed packages.
- Create an index.html page.
- Create a basic main.js file.
- Create a basic webpack 2 _webpack.config.js_ file
- Add a file called _calculator.js_ and export the four basic operations.
- Import just the _sum_ operatin into the main.js file and write a sum result.
- Add two build commands in package.json.
- Execute the build commands and check that the bundle result doesn't include
_substract_, _mul_, _div_.

# Building the project

We are going to start from scratch, so let's start by executing _npm init
(remember that the project name should not contains blank spaces and capital
letters).

```
npm init
```

Let's start installing package:

```
npm install  babel-core babel-loader babel-polyfill
    babel-preset-es2015 webpack@2.0.1-beta copy-webpack-plugin
    --save --only=dev
```

Let's add a file called _calculator.js_ and export four functions:

```javascript
export function sum(a, b) {
   return a + b;
}

export substract(a,b) {
  return a - b;
}

export function mul(a, b) {
  return a * b;
}

export function div(a, b) {
  return a / b;
}
```

Let's add a _main.js_ file that will just make a document.write of the result.

```javascript
import {sum} from './calculator'

const result = sum(2, 2);

document.write(`Sum result: {$result}`);
```

Let's create a simple HTML file that will add a reference to the generated
_bundle.js_

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

  <script src="bundle.js"></script>
  </body>
</html>
```

It's time to configure our _webpack.config.js_

```javascript
```

Let's configure some commands in our package.json

```javascript
"scripts": {
  "build-dev": "webpack",
  "build": "webpack --optimize-minimize",
},
```

Now if we run the build,and check under the build folder we can see that
_div_, _mul_, _substract_ are marked as not in use.

```
npm run build-dev
```

```
npm run build
```



If we run the production build they won't be included in the build


# Links

https://github.com/webpack/webpack/tree/master/examples/harmony-unused

https://github.com/rauschma/tree-shaking-demo/blob/master/webpack.config.js

https://github.com/blacksonic/babel-webpack-tree-shaking
