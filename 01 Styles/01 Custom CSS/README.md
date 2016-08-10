# Custom CSS file sample

Let's get started working with styles.

In this demo will create a custom CSS file (it will contain a simple css class
that will setup a background color to red).

We will start from sample 00 Intro/04 JQuery.

Summary steps:
 - Create a custom css file.
 - Install style loader and css loader packages .
 - Configure webpackconfig.


# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this guide you will need to take as starting point sample "00 Intro/03 Jquery"

## steps

- Now let's create a simple CSS file that will add a red background when
used on some e.g. div. (we will name it mystyles.css)

```css
.redbkg {
  background-color:  red
}
```

- And now we can just use this style directly in our HTML file (so far so good, if we run this project now we won't see this styles applied, we have to go through some webpack configuration), let's update index.html

```html
<body>
  Hello webpack !
  <div class="redbkg">
    RedBackground stuff
  </div>
</body>
```

- Let's start installing style-loader and css-loader as dev dependencis


````
npm install style-loader --save-dev
````


````
npm install css-loader --save-dev
````

- Let's import this style from our main javascript file, we have to add the following line of code into the students.js file:

````javascript
import * as styles from "./mystyles.css"
````
- If we launch a webpack build this will throw errors, that's because we haven't
defined any loader to handle the css extension, let's configure webpack
properly, let's add to the loader section a css entry and execute first
the css-loader extension (handle css files), then the style-loader (add CSS to the down by injecting a styler class)

````javascript
module: {
  loaders: [
    {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: "style-loader!css-loader"
    },			
    {
      test: /\.js$/,
      loader: "babel-loader",
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }
  ]
},
````

- Now we can just execute the app (npm start) and check how the red background is
being display on the div we have chosen.

![Demo01_00_CSS.png](../../../99 Readme Resources/02 Webpack/Demo01_00_CSS.png "Demo01_00_CSS.png")

- Where did the css go? If we open the developer tools in our browser and hit
the network tab we can check that there is no CSS file being requested, but if we
open the main HTML file, we can check how this have been included as a style.

![Demo01_01_Network.png](../../../99 Readme Resources/02 Webpack/Demo01_01_Network.png "Demo01_01_Network.png")


- In next demos we will learn how to ask webpack to separate the css into separate
files, depending on your scenario you could choose one way or the other.
