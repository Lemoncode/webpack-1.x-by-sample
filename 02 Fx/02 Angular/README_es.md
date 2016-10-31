# Ejemplo de Angular 1.x

En este ejemplo vamos a crear una simple demostración de Angular 1.x (basada en es6).

Comenzaremos desde el ejemplo 03 Ouput,

Pasos a seguir:
 - Instalar librerías de Angular.
 - Crear la aplicación.
 - Referenciar la aplicación desde el HTML.
 - Crear un componente (inline HTML).
 - Crear un servicio.
 - Mostrar el componente.
 - Crear una plantilla HTML externa y consumirlo.


# Pasos a seguir

## Prerrequisitos

Prerrequisitos, necesitarás tener nodejs instalado en el ordenador. Si quieres seguir estos pasos, necesitarás tomar como punto de partida el ejemplo "02 Server"

## Pasos

Vamos a empezar instalando la librería Angular 1.x

```
npm install angular@1.5.8 --save-dev
```

Vamos a comenzar con un nuevo ejemplo, borraremos el contenido del archivo students.js y empezaremos desde cero. Vamos a definir una simple aplicación.

Se necesita angular y crear un simple módulo de aplicación, para probar que esta creando el objeto correcto nos limitaremos a volcar en la consola del objeto de la aplicación

```javascript
import * as angular from 'angular'

var app = angular.module('myStudentsApp', []);

console.log(app);
```

El siguiente paso es referenciar la app en nuestro fichero HTML, vamos a abrir el index.html

```html
<body ng-app="myStudentsApp">
  Hello webpack !
</body>
```

Si arrancamos la aplicación y abrimos la consola del navegador, comprobamos que el objeto app se muestra en la consola.

```
npm start
```

La aplicación está subida y ejecutándose, si seguimos avanzando, ahora podemos quitar la entrada de prueba _console.log_ en el archivo students. Vamos a crear un nuevo archivo
que contendrá un sencillo componente con un texto HTML, vamos a crear el fichero _studentsComponent.js_

```javascript
export const studentsComponent = {
  template: '<h1>Students Component</h1>',
}
```

Registramos este componente en nuestra aplicación principal (students.js)

```javascript
import * as angular from 'angular'
import {studentsComponent} from './studentsComponent'

var app = angular.module('myStudentsApp', []);

app.component('studentsComponent', studentsComponent);
```

Ahora que tenemos el componente definido, podemos crear instancias en el index.html (recuerda kebap case para el HTML, en este caso studentsComponent pasa a ser students-component)

```HTML
<body ng-app="myStudentsApp">
  <students-component/>
</body>
```

Si arrancamos el ejemplo podemos ver que el componente obtenido es instanciado y correctamente renderizado.

```
npm start
```

El uso de texto HTML no es una buena idea, si planificamos usar plantillas complejas, deberíamos pensar en separarlas en plantillas HTML independientes,
vamos a credar una plantilla HTML a la que llamaremos _studentsCompoTemplate.html_ y que añadirá nuestro contenido HTML.

Ahora volvemos al contenido, que nos requerirá el archivo HTML

Para cargar el HTML necesitamos un nuevo loader, en este caso vamos a usar raw loader (hay otros disponibles), vamos a instalarlo:

```
npm install raw-loader --save-dev
```

Vamos a configurarlo correctamente en el webpack.config.js

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

Ahora podemos arrancar el proyecto y comprobar que nuestros últimos cambios están funcionando según lo esperado

```
npm start
```

El paso final es añadir un controlador a este componente y algo de lógica.

Vamos a crear este controlador al studentsComponents

```javascript
export const studentsComponent = {
  template: require('./studentsComponent.html'),
  controller: function() {
    this.message = "Hello from students components";
  }
}
```

Mostramos estos resultados en la plantilla HTML:

```javascript
<h1>Message: {{$ctrl.message}}</h1>
```

Ahora, si arrancamos el ejemplo podemos ver el nuevo mensaje en la aplicación

```
npm start
```
