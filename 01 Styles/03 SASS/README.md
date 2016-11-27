# Supporting SASS

In this demo we rename our css file to sssas extension and add a simple SSAS variable. We will learn how to add a loader that can perform the SSAS preprocessing and then chain it to our css / style pipe.

We will start from sample 01 Styles/02 Import Bootstrap.

Summary steps:
 - Rename mystyles.css to scss.
 - Add some SSAS specific code.
 - Install a SSAS preprocessor loader.
 - Add this preprocessor to the pipe (update webpack.config.js).

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this guide you will need to take as starting point sample "01 Styles/02 Import Bootstrap"

## steps

- Let's start by renaming `mystyles.css` to `mystyles.scss`

- Let's open `mystyles.scss` and add some sass simple code (in this case we will create a variable that will hold a bluebackground, this will introduce a change into our sample app, a bluebackground will be displayed instead of the former red one):

````css
$my-color: blue;

.redbkg {
  background-color:  $my-color
}
````

- Since we have changed the extension of the css file to scss, we have to update the `students.js` file.

````javascript
import * as mystyles from "./mystyles.scss";
````

- Now it's time to start with the webpack plumbing. Let's install a sass preprocessor loader:

````
npm install node-sass --save-dev
npm install sass-loader --save-dev
````
- We only need one more step. Open our `webpack.config.js` and add a new  entry (scss) to the loaders that will use the just installed sass-loader. Interesting to note down: we are chaining loaders, first we preprocess the scss then with the css we obtain as result we just pass the css and styles loaders we were using before.

````javascript
module: {
  loaders: [
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: "style-loader!css-loader!sass-loader"
    },
````

- If we run our app (npm start), we can check that now we are getting a blue backgrond instead of a red one.

![Demo01_03_SASS.png](../../99 Readme Resources/02 Webpack/Demo01_03_SASS.png "Demo01_03_SASS.png")
