# Supporting SASS

En este ejemplo vamos a renombrar la extensión de nuestro archivo css a ssas y añadiremos una variable SSAS. Aprenderemos como añadir un 'loader' para  procesar el archivo SSAS y luego encadenarlo a nuestro proceso css/style.

Empezaremos a partir del ejemplo  01 Styles/02 Importando Bootstrap.

Pasos:
 - Renombrar mystyles.css to scss.
 - Añadir código específico SSAS.
 - Instalar un loader para procesar SSAS.
 - Añadir estre preprocesador a nuestra tubería (actualizar webpack.config.js).

# Pasos para construirlo

## Prerrequisitos

Necesitarás tener instalado nodejs en tu ordenador. Si quieres seguir esta guía, necesitarás tomar el ejemplo anterior "01 Styles/02 Import Bootstrap".

## Pasos

- Let's start by renaming mystyles.css to mystyles.scss

- Let's open mystyles.scss and add some sass simple code (in this case we will create a variable that will hold a bluebackground, this will introduce a change into our sample app, a bluebackground will be displayed instead of the former red one):

````css
$my-color: blue;

.redbkg {
  background-color:  $my-color
}
````

- Since we have change the extension of the css file to scss, we have to update the students.js file.

````javascript
import * as mystyles from "./mystyles.scss"
````

- Now it's time to start with the webpack plumbing, let's install a sass preprocessor loader:

````
npm install node-sass --save-dev
npm install sass-loader --save-dev
````
- We onl need one more step, open our webpack.config and add a new  entry (scss) to the loaders that will use the just installed sass-loader. Interesting to note down: we are chaining loaders, first we preprocess the scss then with the css we obtain as result we just pass the css and styles loaders we were using before.

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
