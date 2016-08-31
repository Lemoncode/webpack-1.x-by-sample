# Ejemplo librería externa (JQuery)

Hasta ahora hemos hecho un buen progreso...pero falta uno de los pilares de fundamentales del desarrollo web, el uso de librerías de terceros.

En este ejemplo instalaremos una librería (JQuery) a través de npm, definida de forma global, y la usaremos. Finalmente acabaremos creando un paquete de librerías por separado.

Empezaremos a partir del ejemplo 03 Output.

Pasos:
 - Instalar JQuery a través de npm.
 - Configuraión del alias global ($).
 - Crear algún ejemplo usando esta librería.
 - Partir en dos paquetes: bundle.js and vendor.js.


# Pasos para construirlo

## Prerrequisitos

Prerrequisitos, necesitas tener instalado nodejs en tu ordenador. Si quieres seguir esta guía, necesitarás tomar el ejemplo anterior "03 Output".

## Pasos

- Empezaremos descargando la librería JQuery a través de npm, en este caso ejecutaremos el siguiente comando `npm install jquery --save`, anotación: esta vez no estamos añadiendo el sufijo *-dev* como parámetro, en este caso el paquete JQuery es una dependencia de la aplicación web y no del proceso de compilación.

````
npm install jquery --save
````

![package.json](../../99 Readme Resources/02 Webpack/Demo04PackageJsonJQuery.png "Demo04PackageJsonJQuery.png")

- Since this is a legacy library it expects to have a global variable available,
instead of assigning this manually let's define it in the webpack.config.js. file,
first we will require an import "webpack" at the top of the file:

````
var webpack = require("webpack");
````

- A continuación vamos a usar un plugin de webpack para definir variables globales: jQuery and $.

````
plugins:[
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  }),
  //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
````

- Ahora está preparado para usarlo, para probarlo, cambiaremos el color de fondo de la página a azul. Vamos a cambiarlo en el elemento body usando  JQuery:

````
import {getAvg} from './averageService';

$('body').css('background-color', 'blue');
````

- Arrancamos la aplicación (npm start) y comprobamos como ha cambiado el color de fondo de blanco a azul.

![Demo04BlueBackground](../../99 Readme Resources/02 Webpack/Demo04BlueBackground.png "Demo04BlueBackground.png")

- To finish with this demo, let's face the following case: we want to split the bundle into two, a main one (application level) and a second one that will hold all the third party library, in order to do that we can use the CommonChunkPlugin
(already included in webpack), in this plugin we specify the libraries that are going to be placed in the separate library js under the 'vendor' category. First let's start by adding a new entry point called 'vendor', and there we define an array including all the libraries that we want to include under that bundle (note down, entry is not an array any more, it's an object).

````
module.exports = {
  entry: {
    vendor: ["jquery"],
    app: "./students.js"
  },
````

- Luego definimos el plugin y el archivo de salida:

````
plugins:[
  new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
  new webpack.ProvidePlugin({
````

Si miramos la carpeta dist, podemos comprobar que los dos paquetes han sido creados.

![Demo04SnapshotDir](../../99 Readme Resources/02 Webpack/Demo04SnapshotDir.png "Demo04SnapshotDir.png")


Finalmente en el archivo index.html generado (en la carpeta dist) podemos comprobar que ambos scripts han sido referenciados satisfactoriamente:

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
