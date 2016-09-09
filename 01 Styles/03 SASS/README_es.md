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

- Empezamos renombrando mystyles.css a mystyles.scss

- Abrimos mystyles.scss y añadimos código SASS (en este caso crearemos una variable que guarde el color de "background" "bluebackground", esto introducirá un cambio en nuestra aplicacióm, se mostrará un fondo del color que definamos, en vez del rojo que ya habíamos puesto):

````css
$my-color: blue;

.redbkg {
  background-color:  $my-color
}
````

- Como hemos cambiado el nombre de la extensión de nuestro archivo, ahora tenemos que actualizarlo en el archivo students.js.

````javascript
import * as mystyles from "./mystyles.scss"
````

- Ahora tenemos que instalar un loader para preprocesar estos archivos:

````
npm install node-sass --save-dev
npm install sass-loader --save-dev
````
- Solo necesitamos un último paso, abre nuestro archivo webpack.config y añade una nueva entrada (scss) para los "loaders" que usaremos el que acabamo de instalar (sass-loader). Interesante anotación: estamos encadenando "loaders", primero procesamos los SCSS, luego obtenemos como resultado el css y los estilos que hemos usado antes con los cargadores.

````javascript
module: {
  loaders: [
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: "style-loader!css-loader!sass-loader"
    },
````

- Si arrancamos nuestra aplicacion (npm start), comprobaremos que tenemos un fondo de color azul, en vez del rojo.

![Demo01_03_SASS.png](../../99 Readme Resources/02 Webpack/Demo01_03_SASS.png "Demo01_03_SASS.png")
