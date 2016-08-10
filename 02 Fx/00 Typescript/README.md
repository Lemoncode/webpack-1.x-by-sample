# Modules Sample

In this demo we will add support for typescript.

We will start from sample 00 Intro/03 Ouput, install typescript locally,
configure a tsconfig file, add some ts like, install ts-loader and apply it to webpackconfig.

Summary steps:
 - Install typescript as a local dependency.
 - Configure typescript for our project (tsconfig)
 - Port our project to typescript and add use in our code some of the ts features.
 - Install ts-loader plugin.
 - Add the proper configuration in webpack.config.js


# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you
want to follow this step guides you will need to take as starting point sample "00 Intro/03 Ouput"

## steps

- Typescript is a nice superset of javascript that allows static typings amongst
other interesting features, our ts code does not run on the browser, we need to transpile it. Let's start by installing typescript locally(*)

````
npm install typescript --save-dev
````

_(*) Why installing typescript locally and not globally? By installing it locally the project does not depend on global dependencies and is easier to e.g make build and pass unit tests on a clean CI machine (e.g. travis node docker instance). Another benefit of installing locally is that we can setup the exact
version of typescript we are using an do not depend on the global version installed on the machine is being executed._

- Next step is to add a tsconfig.json file, this tsconfig will define settings like I want to transpile to ES5 amongst others.

````json
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
````


- Let's port our code to typescript, we are going to rename the files students.js and averageService.js to students.ts and averageService.ts

- Let's introduce some typescript, in the averageService we are going to type the variables we are using:

````javascript
import {getAvg} from "./averageService"

const scores : Array<number> = [90, 75, 60, 99, 94, 30]
const averageScore : number = getAvg(scores);
const messageToDisplay : string = `average score ${averageScore}`;

document.write(messageToDisplay);
````

- Now it's time to configure wepback, let's install a loader that will manage
typescript: ts-loader

````
npm install ts-loader --save-dev
````

- Let's update webpack.config.js in order to use this loader on ts extensiones:

````javascript
module: {
  loaders: [
    {
      test: /\.(ts)$/,
      exclude: /node_modules/,
      loader: 'ts-loader'
    },
````
- Before moving forward, we have to add some changes to our webpack config.js: the
entry point is not named "students.js", we have to update the extension, now the
entry point is "students.ts", and in order to avoid having to add the extensions
to the ts imports we can just add it to the array of extensions to be resolved.

```javascript
module.exports = {
	resolve: {
	      extensions: ['', '.js', '.ts']
	},
	entry: ["./students.ts"],
```


- If we run the example (npm start) we will check that everything is working as expected. But could it be possible to debug the typescript code directly?

- If we recall in the tsconfig.json file we added an option to true "sourceMap:true", in webpack.config.js we can add the option enable-source-map
to link the maps to the generated bundle.js

````javascript
devtool: 'source-map',

module: {
````

- Now if we start the app (npm start) and start the debugger we can directly
place breakpoints on the typescript files.

![Demo01_02_DebugTS.png](../../../99 Readme Resources/02 Webpack/Demo01_02_DebugTS.png "Demo01_02_DebugTS.png")
