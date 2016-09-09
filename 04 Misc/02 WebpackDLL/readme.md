# Webpack DLL Sample

Webpack DLL allows us to separate the libraries bundling in a separate js file,
this js file can be just referenced by the main app file, saving precious
build time, and allowing us to keep js libraries grouped.

We will create the following structure and projects

- dll: the DLL project will generate a single chunk holding jquery library (it could hold several libraries and several chunks)

- app: the application project, it will consume the DLL project
(saving us transpiling time).

# Steps to build it

- This time we are going to follow two approaches:
    - For the _dll_ project start from scratch.
    - For the _app_ project copy the project XXXXXX

- let's create two subfolders name dll and app.

# DLL project

- Navigate into the dll subfolder.

- Inside dll let's run npm init to initialize our package.json
for the dll project and fullfill the project info.

```
npm init
```

- Let's install jquery and save the dependency

```
npm install jquery --save-dev
```

- Let's configure the webpack.config.js file that will generate
the DLL.


# app project


- In the app project we will copy the project XXXX.

- Now we are going to use the Plugin XXXX

- Let's reference the plugin project.

- Let's add some jquery to the XXXX.js file

- Let's run the project.

_Remark this makes sense on medium / big sized project where we are using several libraries and we want to keep the build time short plus partition libraries by groups_

# Learning material

Links:

https://medium.com/@soederpop/webpack-plugins-been-we-been-keepin-on-the-dll-cdfdd6cb8cd7#.4wrtx2o0l

https://robertknight.github.io/posts/webpack-dll-plugins/

http://engineering.invisionapp.com/post/optimizing-webpack/
