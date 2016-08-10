# Webpack 1.x by sample

Learn webpack by sample, each of the samples contains a readme.md file that
indicates the purpose of the sample plus an step by step guide to reproduce it.

The Lemoncode Frontend Master Students are working on a review process, if you want to cooperate in this process or add more useful samples don't hesitate to contact us, fork the project and asking for PR once ready.

# Demos

## 00 Intro

### 00 Boiler plate

In this sample we are going to setup a web project that can be easily managed
by webpack.

We will setup an initial npm project, give support to ES6, and install webpack.

We will create a hellword.js sample.

Summary steps:
 - Intialize package.json (npm init)
 - Create a simple HTML file.

### 01 Import

In this sample we are going to start working with es6 modules (import).

We will start from sample 00 Demo and add a new javascript that will
hold a simple algorithm to calculate the average of an score array.

We will use this javascript array into the main students.js file by importing
it.

Summary steps:
 - Add a new file averageService.js
 - Add an array on students.js
 - Import averageService into students.js
 - Use the averageService inside the students.js code.
 - Transpile and test on index.html


### 02 Server

In this sample we are going to enter into "dev mode". Working with files service
is not ideal when you are developing a web application, we will learn how to launch
a lite web server, how deploy our bundle into a dist folder (including index.html)
,how to debug our es6 code directly into the browser debugger and minify
our bundle.js.

We will start from sample 01 Import, install webpack-dev-server, setup our config
to deploy on config folder and support maps (debug), then we will minify
our bundle.js file via webpack cli params.

Summary steps:
 - Install via npm webpack-dev-server.
 - Execute webpack-dev-server with live reload.
 - Add start command to package.json.


### 03 Output

In this sample we are going to setup a dist folder where the webpack bundle and
main HTML page will be copied to.

We will start from sample 02 Server,

Summary steps:
 - Redirect output (bundle.js) to "dist" folder.
 - Include into the build proccess: copying the index.html file to "dist" folder
 - Let webpack include the bundle.js script into the index.html file.
 - Add map support in order to enable ES6 files to be debugged directly on the browser.
 - Generate a minified version of the bundle.js.

### 04 JQuery

So far we have made good progress on our journey... but we are lacking one of the
basic pillars of web development, consuming third party libraries.

In this demo we will install a legacy library (jquery) via npm, define it as global, and use it. Finally we will end up creating a separate bundle for libraries.

We will start from sample 03 Output.

Summary steps:
 - Install jquery via npm.
 - Setup a global alias ($).
 - Create some sample code using this library.
 - Break into two bundles bundle.js and lib.js.

## 01 Styles

### 01 Custom CSS

Let's get started working with styles.

In this demo will create a custom CSS file (it will contain a simple css class
that will setup a background color to red).

We will start from sample 00 Intro/04 JQuery.

Summary steps:
 - Create a custom css file.
 - Install style loader and css loader packages .
 - Configure webpackconfig.


### 02 Import Bootstrap

In this demo we will install and configure webpack to import the well known
bootstrap css library.

In this demo will import Bootstrap, and use a css component.

We will start from sample 01 Styles/01 Custom CSS.

Summary steps:
 - Install bootstrap.
 - Use a jumbotron element from bootstrap in our HTML.
 - Import the css library.
 - Check that we get errors when running webpack.
 - Install additional loaders in order to manage fonts and other
 files required by bootstrap.
 - Check results.

### 03 SASS

In this demo we rename our css file to sssas extension and add a simple SSAS variable. We will learn how to add a loader that can
make the SSAS preproccess and then chain it to our css / style pipe.

We will start from sample 01 Styles/02 Import Bootstrap.

Summary steps:
 - Rename mystyles.css to scss.
 - Add some SSAS specific code.
 - Install a SSAS preprocessor loader.
 - Add this preprocessor to the pipe (update webpack.config.js).

### 04 Handling Images

In this demo we are going to include images in our project in two flavours: via
javascript and via HTML. On the javascript side we will see is something
straightforward (using the same plugins we used for fonts), for the HTML we will use a new loader html-loader

We will start from sample 01 Styles/03 SSAS.

Summary steps:
 - Add two images to our project.
 - Add the code to load the first image via javascript.
 - Configure the loader.
 - Add the second image to the HTML file.
 - Install html-loader.
 - Configure the html loader in the webpack.config.js

## 02 Fx (frameworks / libraries / languages)

### 00 Typescript

In this demo we will add support for typescript.

We will start from sample 00 Intro/03 Ouput, install typescript locally,
configure a tsconfig file, add some ts like, install ts-loader and apply it to webpackconfig.

Summary steps:
 - Install typescript as a local dependency.
 - Configure typescript for our project (tsconfig)
 - Port our project to typescript and add use in our code some of the ts features.
 - Install ts-loader plugin.
 - Add the proper configuration in webpack.config.js

### 01 React

In this demo we will add support for react.

We will start from sample 00 Intro/03 Ouput, install react locally, update the students.js to jsx and include some basic rendering.


Summary steps:
 - Install reactjs as a local dependency.
 - Update students.js to students.jsx and update content.
 - Let's resolve the jsx extensions and point out the the entry
point has changed
 - Configure the webpack.config.js to  support jsx (loader)

## 03 Misc (other samples)

### 01 Linting

In this sample we are going to introduce Linting. This is a technique which you can analyse code for potential errors, so that can help you to make less mistakes.

We will start from sample _00 Intro/03 Output_.

Summary steps:
 - Installing ESLint.
 - Configuring ESLint.
 - Connecting with Babel.
 - Connecting with Webpack.
 - Adding custom rules.
