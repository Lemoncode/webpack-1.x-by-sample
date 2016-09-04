# Modules Sample

In this file we are going to enter into "dev mode", working with files service
is not ideal when you are developing a web application, we will learn how to launch
a lite web server, how deploy our bundle into a dist folder (including index.html),
how to debug our es6 code directly into the browser debugger and minify
our bundle.js.

We will start from sample "00 Intro / 01 Import", install `webpack-dev-server`, setup our config
to deploy on config folder and support maps (debug), then we will minify
our bundle.js file via webpack cli params.

Summary steps:
 - Install webpack-dev-server via npm.
 - Execute webpack-dev-server with live reload.
 - Add start command to package.json.

# Steps to build it

## Prerequisites

You will need to have [Node.js and npm](https://nodejs.org/en/) (v6.3.1) installed on your computer. To follow this step guides you will need to take as starting point sample "00 Intro / 01 Import" (not taking account appendix).

## steps

- Let's install `webpack-dev-server`, this package ships with a lite server that we
can use as dev web server. This time we'll install this package as a global dependency (note down the "-g" param).

````
npm install webpack-dev-server -g
````

- Now we can directly execute from the command prompt `webpack-dev-server`, this
will launch our web dev server, in this case in port 8080.

![localhost](../../99 Readme Resources/02 Webpack/Demo02_localhost.png "Demo02_localhost.png")

- If we open a browser we can point the url to http://localhost:8080 and we will browse our web app.

![npm init](../../99 Readme Resources/02 Webpack/Demo03_browser.png "Demo03_browser.png")

- One interesting feature that ships this dev server is **live reloading**, thus any changes introduced in any of the javascript files will be automatically detected and webpack dev server will launch the build process and once finished automatically refresh the page being display in the browser. In order to do this we need to call `webpack-dev-server` with an additional param:

![npm init](../../99 Readme Resources/02 Webpack/Demo02_inline.png "Demo02_inline.png")

- We don't need to remember this params every time we want to launch our dev
server, in order to avoid this we can just add a `start` script to our `package.json` file.

![npm init](../../99 Readme Resources/02 Webpack/Demo03_Start.png "Demo03_Start.png")

- Once we have saved this change we can directly execute from the command prompt:

````
npm start
````

- Now that we are using this approach, we don't need `webpack-dev-server` globally installed, we could just install it at project level, stop it and then use `npm start` to launch it again.

````
npm install webpack-dev-server --save-dev
````

And we will get our dev server up and running.

In order to uninstall `webpack-dev-server` globally, execute the next command (note down the "-g" param):

````
npm uninstall -g webpack-dev-server
````
