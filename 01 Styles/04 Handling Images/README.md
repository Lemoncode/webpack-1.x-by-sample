# Handling Images

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


# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this guide you will need to take as starting point sample "01 Styles/03 SSAS"

## steps

- Let's start by making some cleanup in our index.html, we are going to remove the bootstrap jumbotron html markup and add a div with a given "id".

````html
<body>    
  Hello webpack !

  <div id="imgContainer">
  </div>

  <div class="redbkg">
    RedBackground stuff
  </div>
</body>
````

- We will continue by creating a folder named content and adding two images there (logo1.png, logo2.png).

- Let's jump into students.js and import logo1.png, then usign javascript let's place it under a given DIV:

````javascript
import logoImg from './content/logo_1.png'

var img = document.createElement('img');
img.src = logoImg;
````

- We have already installed url-loader plugin, we only need to configure the extension png/jpeg the webpack.config.js loaders sections. One thing to note down, we are adding an additional parameter to the url-loader call (limit) by using this parameter we are telling the loader if the image size is less than
5Kb approx just encode it and embed it directly on the HTML file

````javascript
loaders: [
  {
    test: /\.(png|jpg)$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=5000'
  },			
````

- Now if run the app (npm start) we can check that the first logo is being shown.

![Demo01_04_app1.png](../../99 Readme Resources/02 Webpack/Demo01_04_app1.png "Demo01_04_app1.png")



- That's fine but what if we had already the image referenced in side an img
html tag? Let's add logo2.png to the index.html file.

````html
<body>
  Hello webpack !

  <img src="./content/logo_2.png"/>
````

-  There is a plugin called "html-loader" that will search in the html for img tags and process them. Let's install the html-loader:

````
npm install html-loader --save-dev
````


- Let's update webpack.config.js to use this html-loader plugin

````javascript
module: {
  loaders: [
    {			  
      test: /\.html$/,
      loader: 'html-loader'
    },
````

- Now if we run the app (npm start) we can see the second logo appearing

![Demo01_04_app2.png](../../99 Readme Resources/02 Webpack/Demo01_04_app2.png "Demo01_04_app2.png")
