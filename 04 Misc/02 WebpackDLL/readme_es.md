# Ejemplo de Webpack DLL

Webpack DLL nos permite separar las librerías de bundling en archivos js separados,
este archivo js puede ser referenciado por el archivo principal de la aplicación,
ahorrándonos tiempo de construcción, y permitiéndonos mantener las librerías js agrupadas.

Crearemos la siguiente estructura y proyectos.

- dll: el proyecto DLL generará una sola librería jquery (podría mantener varias librerías y varios fragmentos)

- app: el proyecto de la aplicación, consumirá el proyecto DLL
(ahorrándonos tiempo de transpilación).

# Pasos a seguir

- Vamos a seguir dos enfoques:
    - Para el proyecto _dll_ comenzaremos desde cero.
    - Para el proyecto _app_ copiamos el proyecto XXXXXX

- Creamos dos subdirectorios llamados dll y app.

# Proyecto DLL

- Navegar dentro del subdirectorio dll.

- Dentro de dll, vamos a arrancar npm init para inicializar nuestro package.json para el proyecto dll
y cumplir con la información del proyecto.

```
npm init
```

- En el package Json se añadirá un comando de configuración (build):

```javascript
"scripts": {
  "build": "webpack",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```
- Instalar las dependencias Webpack en modo desarrollo

```
npm install wepback --save-dev
```

- Instalar lodash y guardar la dependencia

```
npm install lodash --save
```

- Configurar el archivo webpack.config.js que generará el DLL.

```javascript
var path = require("path");
var webpack = require("webpack");

var basePath = __dirname;
var outputPath = 'dist';

module.exports = {
  context: process.cwd(),
  entry: {
    vendor:[
     'lodash',
    ]
  },

 output: {
    filename: '[name].dll.js',
    path: path.join(basePath, outputPath),
    library: '[name]',
  },

  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(outputPath, '[name]-manifest.json')
    })
  ]
};
```

- Generar el bundle dll

```
npm run build
```

# Proyecto de la aplicación


- En el proyecto de la aplicación copiaremos el proyecto 00 Intro / 03 Output, vamos a copiar el contenido de nuestro proyecto dentro del subdirectorio app.

- Instalar las dependencias

```
npm install
```

- En el webpack config vamos a añadir un require a webpack

```javascript
var webpack = require("webpack");
```

- Ahora vamos a copiar los archivos "dll" generados, (bajo dll/dist) al subdirectorio bajo el directorio app (lo llamaremos dll), este paso se puede hacer de forma automática.

- Ahora vamos a usar el DLL generado para el proyecto anterior de acuerdo a hacerles referencia usando el DLLReferencePlugin.

```javascript
plugins:[
  new webpack.DllReferencePlugin({
        context: './dll',
        manifest: require('./dll/vendor-manifest.json')
       ,name: './dll/vendor.dll.js'
  }),
```


- Es el momento de usar lodash, vamos a actualizar el código de ejemplo students.js

```javascript
import * as _ from "lodash";

const result = _.sum([2, 3, 4, 5]);
const messageToDisplay = `Sum Result ${result}`;

document.write(messageToDisplay);
```

- Ya podemos arrancar el proyecto y ver los resultados

```
npm start
```


_Remarcar que esto tiene sentido en proyectos de medianos / grandes donde usamos varias librerías y queremos mantener en un corto tiempo de construcción muchas librerías por grupos.

# Material de aprendizaje

Referencia:

https://medium.com/@soederpop/webpack-plugins-been-we-been-keepin-on-the-dll-cdfdd6cb8cd7#.4wrtx2o0l

https://robertknight.github.io/posts/webpack-dll-plugins/

http://engineering.invisionapp.com/post/optimizing-webpack/
