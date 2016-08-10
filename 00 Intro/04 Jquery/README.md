# External lib sample (jquery)

So far we have made good progress on our journey... but we are lacking one of the
basic pillars of web development, consuming third party libraries.

In this demo we will install a legacy library (jquery) via npm, define it as global, and use it. Finally we will end up creating a separate bundle for libraries.

We will start from sample 03 Output.

Summary steps:
 - Install jquery via npm.
 - Setup a global alias ($).
 - Create some sample code using this library.
 - Break into two bundles bundle.js and lib.js.


# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this guide you will need to take as starting point sample "03 Output"

## steps

- Let's start by downloading the jquery library via npm, in this case we will execute the following command from the command prompt "npm install jquery --save", note down: this time we are not adding the -dev parameter, this time the jquery package is a dependency from the web app not  from the build process.

````
npm install jquery --save
````

![package.json](../../../99 Readme Resources/02 Webpack/Demo04PackageJsonJQuery.png "Demo04PackageJsonJQuery.png")

- Since this is a legacy library it expects to have a global variable available,
instead of assigning this manually let's define it in the webpack.config.js. file,
first we will require an import "webpack" at the top of the file:

````
var webpack = require("webpack");
````

- Then we will use a plugin from webpack to define as global variables jquery and
$

````
plugins:[
  new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
  }),
  //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
````


- Now are ready to use it, just to test it, let's change the background color of the page body to blue.Let's change the background of the body element using jquery:

````
import {getAvg} from './averageService'

$('body').css('background-color', 'blue');
````

- Now we can just execute the app (npm start) and check how the background of the page has changed from white to blue.

![Demo04BlueBackground](../../../99 Readme Resources/02 Webpack/Demo04BlueBackground.png "Demo04BlueBackground.png")


- To finish with this demo, let's face the following case: we want to split the bundle into two, a main one (application level) and a second one that will hold all the third party library, in order to do that we can use the CommonChunkPlugin
(already included in webpack), in this plugin we specify the libraries that are going tobe placed in the separate library js under the 'vendor' category. First let's start by adding a new entry point called 'vendor', and there we define an array including all the libraries that we want to include under that bundle (note down, entry is not an array any more, it's an object).

````
module.exports = {
  entry: {
		 vendor: ["jquery"],
		 app: "./students.js"
	},
````

- Then we defined the plugin and the output file

````
plugins:[
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  new webpack.ProvidePlugin({
````

Now if we take a look to the dist folder we can check that the two bundles have been created

![Demo04SnapshotDir](../../../99 Readme Resources/02 Webpack/Demo04SnapshotDir.png "Demo04SnapshotDir.png")


And in the generated index.html (under dist) we can check that both scripts have been successfully referenced:

````
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>    
  </head>
  <body>
    Hello webpack !
  <script type="text/javascript" src="vendor.js?320a16e25cb5421c9f10">
  </script><script type="text/javascript" src="bundle.js?320a16e25cb5421c9f10"></script></body>
</html>
````
