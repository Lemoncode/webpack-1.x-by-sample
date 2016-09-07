# TypeScript

In this demo we will add support for [TypeScript](https://www.typescriptlang.org/).

We will start from sample
[00 Intro / 03 Ouput](https://github.com/Lemoncode/webpack-1.x-by-sample/tree/master/00%20Intro/03%20Output)
, install TypeScript locally, configure a *tsconfig.json* file, add some ts like,
install [*ts-loader*](https://github.com/TypeStrong/ts-loader)
and set it up in *webpack.config.js*.

Summary steps:
 - Install TypeScript as a local dependency.
 - Configure TypeScript for our project via *tsconfig.json* file.
 - Port our project to TypeScript and add some features in our code.
 - Install [*ts-loader*](https://github.com/TypeStrong/ts-loader) plugin.
 - Add the proper configuration in *webpack.config.js*.


# Steps to build it

## Prerequisites

Prerequisites, you will need to have [Node.js](https://nodejs.org) installed in your
computer. If you want to follow this guide you will need to take as starting point 
sample [00 Intro / 03 Ouput](https://github.com/Lemoncode/webpack-1.x-by-sample/tree/master/00%20Intro/03%20Output).

## steps

- TypeScript is a nice superset of JavaScript that allows static typings amongst
other interesting features. All the code we type in TypeScript will not run on the
browser, so we need to transpile it. Let's start by installing TypeScript locally(*).

```
npm install typescript --save-dev
```

_(*) Why installing TypeScript locally and not globally? By installing it locally the 
project does not depend on global dependencies and is easier to e.g make build and pass
unit tests on a clean CI (Continuous Integration) machine like [Travis](https://travis-ci.org/),
[Docker](https://www.docker.com/), [Jenkins](https://jenkins.io/), etc.
Another benefit of installing locally is that we can set up a specific version of 
TypeScript with no rely on the global version installed on the machine
is being executed._

- The next step is to add a TypeScript configuration file, *tsconfig.json*.
In this file will define the settings that we want, e.g to transpile to ES5 amongst others.

```json
{
  "compilerOptions": {
  "target": "es5",
  "module": "commonjs",
  "declaration": false,
  "noImplicitAny": false,      
  "sourceMap": true,
  "suppressImplicitAnyIndexErrors": true
  },
  "exclude": [
    "node_modules"
  ]
}
```

- Let's port our code to TypeScript, we are going to rename the files *students.js*
and *averageService.js* to _students.**ts**_ and _averageService.**ts**_.

- Let's introduce some TypeScript, in *students.ts* we are going to type the
variables we are using:

```javascript
import {getAvg} from './averageService';

const scores: Array<number> = [90, 75, 60, 99, 94, 30];
const averageScore: number = getAvg(scores);
const messageToDisplay: string = `average score ${averageScore}`;

document.write(messageToDisplay);
```

- Next we'll type our function in *averageService.ts*:

```javascript
export function getAvg(score): number {
  return score.reduce(function (p, c) {
    return p + c;
  }) / score.length;
}
```

- Now it's time to configure *wepback*, let's install a loader that will manage
TypeScript: [*ts-loader*](https://github.com/TypeStrong/ts-loader).

```
npm install ts-loader --save-dev
```

- Let's update *webpack.config.js* in order to use this loader on **ts** extension files:

```javascript
module: {
  loaders: [
    {
      test: /\.(ts)$/,
      exclude: /node_modules/,
      loader: 'ts-loader'
    },
```

- Before moving forward, we have to add some changes to our *webpackconfig.js*: the
entry point is not named "students.js", we have to update the extension. Now the
entry point is "students.**ts**", and in order to avoid having to add the extensions
to the ts imports we can just add it to the array of extensions to be resolved:

```javascript
module.exports = {
	resolve: {
    extensions: ['', '.js', '.ts']
	},
	entry: ['./students.ts'],
```

- If we run the app (npm start) we can check that everything is working as expected.
But could it be possible to debug the TypeScript code directly?

- If we recall in the *tsconfig.json* file we added `sourceMap` option to `true`.
In *webpack.config.js* we can add the option `enable-source-map`
to link the maps to the generated *bundle.js*:

```javascript
devtool: 'source-map',

module: {
```

- Now if we start the app (npm start) and start the debugger we can directly
place breakpoints on the TypeScript files:

![Demo01_02_DebugTS.png](../../99 Readme Resources/02 Webpack/Demo01_02_DebugTS.png "Demo01_02_DebugTS.png")
