# Webpack 2 Tree Shaking

One of the most interesting features that ships Webpack 2 is TreeShaking: this
allows to remove from a destination bundle the exports that are not in use
by the project, reducing dramatically the size of our bundle.

We are going to create a simple sample:

 - A calculator module where we create an export per basic operations (_sum_, _substract_, _mul_, _div_..).

 - A main.js file that will import this calculator module and use only _sum_ operation.

We will use webpack's 2 tree shaking and check that we end up having a bundle that doesn't
contain the code for _substract_, _mul_, and _div_.

This sample is based on the following work [tree shaking demo](https://github.com/rauschma/tree-shaking-demo/blob/master/webpack.config.js)

## Steps to build it

This time we will start from scratch:

- Execute _npm init_ from the command prompt.
- Install the needed packages.
- Create a src folder where we will put all the source files. 
- Create a file called _calculator.js_, inside src folder, and export the four basic operations.
- Create a basic main.js file inside src folder.
- Create an index.html page inside src folder.
- Create a basic webpack 2 _webpack.config.js_ file.
- Import just the _sum_ operation into the main.js file and write a sum result.
- Add two build commands in package.json.
- Execute the build commands and check that the bundle result doesn't include
_substract_, _mul_, _div_.

# Building the project

We are going to start from scratch, so let's start by executing _npm init_
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
Let's create a folder called _src_ where we will put the next three files.

First create a file called _calculator.js_ and export four functions:

```javascript

export function sum(a, b) {
   return a + b;
}

export function substract(a,b) {
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

Let's create a simple HTML file (_index.html_) that will add a reference to the generated
_bundle.js_.

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

It's time to configure our _webpack.config.js_, create it on the root folder.

```javascript
var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var dir_src = path.resolve(__dirname, 'src');
var dir_build = path.resolve(__dirname, 'build');

module.exports = {
    entry: path.resolve(dir_src, 'main.js'),
    output: {
        path: dir_build,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: dir_src,
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: dir_src,
                query: {
                    // All of the plugins of babel-preset-es2015,
                    // minus babel-plugin-transform-es2015-modules-commonjs
                    plugins: [
                        'transform-es2015-template-literals',
                        'transform-es2015-literals',
                        'transform-es2015-function-name',
                        'transform-es2015-arrow-functions',
                        'transform-es2015-block-scoped-functions',
                        'transform-es2015-classes',
                        'transform-es2015-object-super',
                        'transform-es2015-shorthand-properties',
                        'transform-es2015-computed-properties',
                        'transform-es2015-for-of',
                        'transform-es2015-sticky-regex',
                        'transform-es2015-unicode-regex',
                        'check-es2015-constants',
                        'transform-es2015-spread',
                        'transform-es2015-parameters',
                        'transform-es2015-destructuring',
                        'transform-es2015-block-scoping',
                        'transform-es2015-typeof-symbol',
                        ['transform-regenerator', { async: false, asyncGenerators: false }],
                    ],
                },
            }
        ]
    },
    plugins: [
        // Simply copies the files over
        new CopyWebpackPlugin([
            { from: path.resolve(dir_src, 'index.html') } // to: output.path
        ]),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ]
};
```

Let's configure some commands in our package.json.

```javascript
"scripts": {
  "build-dev": "webpack",
  "build-prod": "webpack --optimize-minimize"
},
```

Now if we run the build,and check under the build folder we can see that
_div_, _mul_, _substract_ are marked as not in use.

```
npm run build-dev
```

If we take a look to the generated _bundle.js_ we will find the following entries:

```
/* harmony export */ exports["sum"] = sum;/* ununsed harmony export substract */;/* ununsed harmony export mul */;/* ununsed harmony export div */;
```

If we want to get the minified version of this js file (that won't contain unused exports):

```
npm run build-prod
```

If we run the production build they won't be included in the build.


# Links

Some interesting samples if you want to keep on learning:

https://github.com/webpack/webpack/tree/master/examples/harmony-unused

https://github.com/rauschma/tree-shaking-demo/blob/master/webpack.config.js

https://github.com/blacksonic/babel-webpack-tree-shaking
