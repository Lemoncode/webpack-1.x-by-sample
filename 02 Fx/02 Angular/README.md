# Angular 1.x Sample

In this sample we are going to create a simple Angular 1.x sample (es6 based).

We will start from sample 03 Ouput,

Summary steps:
 - Installing Angular libraries.
 - Creating the app.
 - Instantiating the app from the html.
 - Creating a component (inline HTML).
 - Creating a service.
 - Displaying the component.
 - Creating an exernal HTML template and consumingit.


# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample "02 Server"

## steps


Let's start by installing Angular 1.x library

```
npm install angular@1.5.8 --save-dev
```

We are going to start with a new sample, let's clear up the students.js file and start from scratch. Let's define a simple app.

Let's require angular and create a simple app module, to test that it's Creating the right object we will just dump into the console the app object.

```javascript
import * as angular from 'angular'

var app = angular.module('myStudentsApp', []);

console.log(app);
```

The next step is to reference the app in our HTML file, let's open index.html

```html
<body ng-app="myStudentsApp">
  Hello webpack !
</body>
```

If we run the application and open the browser console, we check that app object
is displayed in the console.

```
npm start
```

Application up and running, let's move forward, we can now remove the test
_console.log_ entry in the students file. We are going to create a new file
that will contain a simple component with an inline template, let's create
a file called _studentsComponent.js_

```javascript
export const studentsComponent = {
  template: '<h1>Students Component</h1>',
}
```

Let's register this component in our main app (students.js)

```javascript
import * as angular from 'angular'
import {studentsComponent} from './studentsComponent'

var app = angular.module('myStudentsApp', []);

app.component('studentsComponent', studentsComponent);
```

Now that we have the component defined, we can instantiate in the index.html
file (remember kebap case for the HTML, in this case studentsComponent turns in to students-component)

```HTML
<body ng-app="myStudentsApp">
  <students-component/>
</body>
```

If we run the sample we can see that the component get's instantiated and
rendering properly.

```
npm start
```

Using inline HMTL is not a good idea, if we plan to use complex layouts, we
should think about separating them in a separate HTML template, let's create
an html template that we will call _studentsCompoTemplate.html_ and add our
HTML content

Now going back into the content, we are just going to require the HTML file

In order to load the HTML we need a new loader, in this case we are going to use
raw loader (there are other avaialble), let's install this loader:

```
npm install raw-loader --save-dev
```

Let's properly configure it into the webpack.config.js

```javascript
module: {
  loaders: [
    {
      test: /\.html$/,
      exclude: /node_modules/,
      loader: "raw-loader"
    },
    //...
   ]
```

Now we can run the project and check that our latest changes are working as
expected

```
npm start
```

The final step is to add a controller to this component and add some logic.

Let's create a file called _studentscontroller.js_ and add a list of
students.

Let's display this customers into the htlm template:
