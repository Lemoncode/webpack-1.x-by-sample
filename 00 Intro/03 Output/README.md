# Modules Sample

In this sample we are going to setup a dist folder where the webpack bundle and
main HTML page will be copied to.

We will start from sample 02 Server,

Summary steps:
 - Redirect output (bundle.js) to "dist" folder.
 - Include into the build proccess: copying the index.html file to "dist" folder.
 - Let webpack include the bundle.js script into the index.html file.
 - Add map support in order to enable ES6 files to be debugged directly on the browser.
 - Generate a minified version of the bundle.js.


# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample "02 Server"

## steps

- It's not a good idea to mix source code with generated one (bundle), ideally this generated code should be placed under a separate folder (let's name it dist). In order to setup this we have to indicate webpack the output folder. First we will require the "path" package on top of our `webpack.config.js` file just to get some helpers to manipulate paths. We will also create a member variable that will hold the basePath (current path where webpack.config is being placed):

````
var path = require("path");

var basePath = __dirname;
````

- Then under the output section we will add a new parameter called path and we will add a new parameter indicating that the ouput path will be current path + "/dist". Now we can execute `webpack` and check that the bundle output is generated under the dist folder.

````
output: {
    path: path.join(basePath, "dist"),
    filename: 'bundle.js'
  },
````

- We have the js file under the dist folder, wouldn't it be nice to include the index.html into that folder? And what's more wouldn't be great if didn't need to manually inject the script tag pointing to the bundle.js file, and let webpack do that for us? (including a hash param to avoid browser caching when new versions are being deployed). In order to do that we are going to introduce the concept of [webpack plugin](https://webpack.github.io/docs/plugins.html): plugins allows us to inject custom build steps. Meanwhile loaders (e.g. babel-loader) act file by file (files that match the given extension e.g. js, or ts...), plugins act globally and are executed once. We are going to install a plugin called [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin). In the command prompt, type:

````
npm install html-webpack-plugin --save-dev
````

- Let's remove from our base index.html the script tag:

````
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>    
  </head>
  <body>
    Hello webpack !
  </body>
</html>
````

- This plugin (html-webpack-plugin) will take as template input our index.html, and we will
point an output destination (index.html under dist folder). The plugin will copy index.html into destination and inject the script tag including a hash tag to avoid browser caching when new versions are being deployed. Once we have installed it, we need to require it on top of our webpack.config.js file:

````
var HtmlWebpackPlugin = require('html-webpack-plugin');
````

- In order to configure it we have to add the following section
on our webpack.config.js (right after modules definition).

````
plugins:[
  //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: 'index.html', //Name of file in ./dist/
    template: 'index.html' //Name of template in ./src
  })
]
````


- Now if we run webpack we will realize that index.html is copied under the dist folder
and the script tag is automatically being generated. There is only one caveat... we are not getting any additional hash param to avoid browser caching, we can do that by setting the option hash to true:

````
plugins:[
  //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: 'index.html', //Name of file in ./dist/
    template: 'index.html', //Name of template in ./src
    hash: true			
  })
]
````

![html hash](../../99 Readme Resources/02 Webpack/Demo03_htmlHash.png "Demo03_htmlHash.png")


- This looks quite well but... we are developers. What would happen if we attempt to debug from the browser our web app? By default we only will be able to debug bundle.js (big file already trasnpiled to es5), if we need to pinpoint issues and debug step by step this is far from ideal. Is there a way to let the browser link our original files and let us debug directly on es6 mode? The answer is yes, we only need to add a line of code to our `webpack.config` cofiguration, right after `output` closing curly bracket, we can include this line:

````
devtool: 'source-map',
````

Now if you just start our web server again (npm start) and open the developer tab we will be
able to browse our original es6 files and place breakpoints / debug.

![map browser](../../99 Readme Resources/02 Webpack/Demo03_mapBrowser.png "Demo03_mapBrowser.png")

- Just to wrapup... a mandatory step on any web app is not minify / obsfuscate the javascript
files, in order to do that we only need to call webpack adding the param -p

````
webpack -p
````

If we open the generated bundle.js file we will realize that the new version has been minified.

![minified](../../99 Readme Resources/02 Webpack/Demo03_Minified.png "Demo03_Minified.png")
