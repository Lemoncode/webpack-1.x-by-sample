# 03 Angular 2 with Webpack Sample App

In this sample we are going to setup a basic Angular 2 app with Webpack.

Summary steps:
- Prerequisite: Install Node.js and npm.
- Create and configure the project.
- Configure webpack.
- Create the application.
- Build and run the application.


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running node -v and npm -v in a terminal / console window. Older versions may produce errors.

## Steps

### Create and configure the project.

- Create a directory to hold the example, and make that your working directory.

 ```bash
 $ mkdir angular2-webpack
 $ cd angular2-webpack
 ```

- Execute the `npm init` command.

 ```bash
 $ npm init
 ```

 This command prompts you for a number of things, such as the name and version about the
 project. For now, you can simply hit RETURN to accept the defaults for most of them
 (once you have successfully fullfilled them a `package.json` file we will generated).

 ![npm init](../../99 Readme Resources/02 Fx/03 Angular2/npm_init.png "npm_init.png")

- Now install the required dependencies for Angular 2 and save it in the dependencies list.

 ```bash
 $ npm install @angular/common @angular/compiler @angular/core
  @angular/platform-browser @angular/platform-browser-dynamic core-js
  reflect-metadata rxjs zone.js --save
 ```

- Install also typescript definitions for `core-js`.

 ```bash
 $ npm install @types/core-js --save-dev
 ```

 > This will install most of the angular 2 typings.

### Configure Webpack

- Install with `npm` the following packages as dev dependencies:

    - webpack
    - webpack-dev-server

 ```bash
 $ npm install webpack webpack-dev-server --save-dev
 ```

- Now install the following extra packages also as dev dependencies:

    - css-loader
    - extract-text-webpack-plugin
    - html-webpack-plugin
    - style-loader
    - ts-loader

 ```bash
 $ npm install html-webpack-plugin extract-text-webpack-plugin
  ts-loader css-loader style-loader --save-dev
 ```

- Modify the `package.json` file an add the next property `"start": "webpack-dev-server"` under the scripts object. It allows us to launch webpack from the command line through npm typing `npm start`.

- The `package.json` file should looks something like this.

 ```json
  {
    "name": "angular2-webpack-sample-app",
    "version": "1.0.0",
    "description": "Angular 2 with Webpack Sample App",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "webpack-dev-server"
    },
    "keywords": [
      "angular2",
      "webpack",
      "sample",
      "app"
    ],
    "author": "David Atencia <david.atencia@gmail.com>",
    "license": "MIT",
    "devDependencies": {
      "@types/core-js": "^0.9.34",
      "css-loader": "^0.25.0",
      "extract-text-webpack-plugin": "^1.0.1",
      "html-webpack-plugin": "^2.22.0",
      "style-loader": "^0.13.1",
      "ts-loader": "^0.8.2",
      "typescript": "^2.0.3",
      "webpack": "^1.13.2",
      "webpack-dev-server": "^1.16.2"
    },
    "dependencies": {
      "@angular/common": "^2.0.2",
      "@angular/compiler": "^2.0.2",
      "@angular/core": "^2.0.2",
      "@angular/platform-browser": "^2.0.2",
      "@angular/platform-browser-dynamic": "^2.0.2",
      "core-js": "^2.4.1",
      "reflect-metadata": "^0.1.8",
      "rxjs": "^5.0.0-beta.12",
      "zone.js": "^0.6.25"
    }
  }
 ```

- Create a file called `webpack.config.js` and add the following content.

 ```javascript
  var path = require('path');
  var webpack = require('webpack');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var basePath = __dirname;

  module.exports = {

    context: path.join(basePath, "src"),

    resolve: {
      extensions: ['', '.js', '.ts']
    },

    entry: {
      app: './index.ts',
      styles: [
        './css/site.css'
      ],
      vendor: [
        "core-js",
        "reflect-metadata",
        "zone.js",
        "@angular/core",
        "@angular/platform-browser",
        "@angular/platform-browser-dynamic",
        "@angular/common",
        "@angular/compiler",
        "rxjs"
      ]
    },

    output: {
      path: path.join(basePath, "dist"),
      filename: '[name].js'
    },

    devServer: {
      contentBase: './dist', //Content base
      inline: true, //Enable watch and live reload
      host: 'localhost',
      port: 8080
    },

    devtool: 'source-map',

    module: {
      loaders: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'ts'
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract('style', 'css')
        }
      ]
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
      new ExtractTextPlugin('[name].css'),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html'
      })
    ]

  }
 ```

### Create the application.

- Create a subfolder called `src` with the following structure. This folder will hold the application.

 ![App folder structure](../../99 Readme Resources/02 Fx/03 Angular2/scr_folder_structure.png "App folder structure")

- The `app.ts` file stores the main "container" component.

 ```javascript
 import { Component } from '@angular/core';

 @Component(
   {
     selector: 'app',
     template: `
       <h1>{{title}}</h1>
     `
   }
 )
 class App {
   title: string = "Hello Angular 2 with Webpack!"
 }

 export {
   App
 }
 ```

    - **selector**: This property is used to define how to call this component from HTML.
    - **template**: We are defining our *template* string between [backticks](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) this is a new feature of ES6 that allow us to do multiline strings (we could as well separate this into a separate HTML template).


- The `index.ts` file contains the **NgModule**, this is needed for booting our application.

 ```javascript
 import { NgModule } from '@angular/core';
 import { BrowserModule } from '@angular/platform-browser';
 import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

 import { App } from './components/app';

 @NgModule({
   declarations: [App],
   imports: [BrowserModule],
   bootstrap: [App]
 })
 class AppModule {
 }

 platformBrowserDynamic().bootstrapModule(AppModule)
 ```

    - **declarations**: defines which components we are going to use in this module. In this case App component.
    - **imports**: describes which *dependencies* this module has. In this case, we are going to create a browser app, so we have to use BrowserModule. We are going to add here our custom modules that our app needs.
    - **bootstrap**: this property tells Angular to load, in this case, App component as the top-level component.
    - The last line `platformBrowserDynamic().bootstrapModule(AppModule)` initialize the browser platform to runs AppModule application.


- The `index.html` will use the `app` selector we defined above.

 ```html
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8">
     <meta name="viewport" content="initial-scale=1, maximum-scale=1">
     <title>Angular 2 with Webpack Sample App</title>
   </head>
   <body>
     <div>
         <app>
           Loading...
         </app>
     </div>
   </body>
 </html>
 ```

- The `site.css` file contains the css styles used by the application.

 ```css
 h1 {
   color: #ACDF2C
 }
 ```

### Build and run the application

- Run the sample with the following command:

 ```bash
 $ npm start
 ```

 > This will bundle our app and starts the dev server.

- Then, load http://localhost:8080/ in a browser to see the output.

 ![Browser Output](../../99 Readme Resources/02 Fx/03 Angular2/browser_output.png "Browser Output")
