# Webpack 2 Tree Shaking

Una de las características más interesantes que tiene Webpack es Treeshaking:
esto permite quitar desde un bundle destino los exports que no se utilizan para el proyecto, reduciendo drásticamente el tamaño de nuestro bundle.

Vamos a crear un ejemplo simple:

 - Un módulo calculator, donde crearemos un export para operaciones básicas (_sum_, _substract_, _mul_, _div_..).

 - Un archivo main.js el cual importará este módulo calculator y que solo usa el operador _sum_.

Emplearemos el Tree Shaking de Webpack 2, y comprobaremos que finalmente obtendremos un archivo bundle que no contendrá el código de las operaciones _substract_, _mul_ y _div_.

Este ejemplo esta basado en el siguiente trabajo [tree shaking demo](https://github.com/rauschma/tree-shaking-demo/blob/master/webpack.config.js)

## Pasos a seguir

Es momento de empezar desde cero:

- Ejecutar _npm init_ desde un terminal.
- Instalar las dependencias necesarias.
- Crear un directorio src donde se localizarán todos los archivos de código fuente.
- Crear un fichero llamado _calculator.js_, dentro del directorio src, y exportar las cuatro operaciones básicas.
- Crear un nuevo fichero main.js dentro del directorio src.
- Crear una página index.html dentro del directorio src-
- Crear el archivo _webpack.config.js_, de configuración básica para Webpack 2.
- Importar la operación _sum_ dentro del archivo main.js y escribir el resultado de la suma.
- Añadir dos commandos de configuración en el package.json.
- Executar los comandos de configuración y comprobar que el bundle obtenido no incluye las siguientes operaciones _substract_, _mul_, _div_.

# Construyendo el proyecto

Vamos a empezar desde cero, así que vamos a comenzar ejecutando _npm init_
(recuerda que el proyecto no debe contener espacios en blanco ni letras mayúsculas).

```
npm init
```

Instalación del paquete:
```
npm install  babel-core babel-loader babel-polyfill
    babel-preset-es2015 webpack@2.0.1-beta copy-webpack-plugin
    --save --only=dev
```
Vamos a crear un directorio llamado _src_ donde pondremos los tres archivos.

Primero crear un archivo llamado _calculator.js_ y exportar las cuatro funciones.

```javascript

export function sum(a, b) {
   return a + b;
}

export function substract(a,b) {
  return a - b;
}

export function mul(a, b) {
  return a * b;
}

export function div(a, b) {
  return a / b;
}
```

Añadir un archivo _main.js_ que hará un document.write del resultado.

```javascript
import {sum} from './calculator'

const result = sum(2, 2);

document.write(`Sum result: {$result}`);
```

Crear un archivo HTML (_index.html_) que hará referencia al _bundle.js_ generado.

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

  <script src="bundle.js"></script>
  </body>
</html>
```

Es el momento de configurar nuestro _webpack.config.js_, creálo en el directorio raíz.

```javascript
var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var dir_src = path.resolve(__dirname, 'src');
var dir_build = path.resolve(__dirname, 'build');

module.exports = {
    entry: path.resolve(dir_src, 'main.js'),
    output: {
        path: dir_build,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: dir_src,
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: dir_src,
                query: {
                    // All of the plugins of babel-preset-es2015,
                    // minus babel-plugin-transform-es2015-modules-commonjs
                    plugins: [
                        'transform-es2015-template-literals',
                        'transform-es2015-literals',
                        'transform-es2015-function-name',
                        'transform-es2015-arrow-functions',
                        'transform-es2015-block-scoped-functions',
                        'transform-es2015-classes',
                        'transform-es2015-object-super',
                        'transform-es2015-shorthand-properties',
                        'transform-es2015-computed-properties',
                        'transform-es2015-for-of',
                        'transform-es2015-sticky-regex',
                        'transform-es2015-unicode-regex',
                        'check-es2015-constants',
                        'transform-es2015-spread',
                        'transform-es2015-parameters',
                        'transform-es2015-destructuring',
                        'transform-es2015-block-scoping',
                        'transform-es2015-typeof-symbol',
                        ['transform-regenerator', { async: false, asyncGenerators: false }],
                    ],
                },
            }
        ]
    },
    plugins: [
        // Simply copies the files over
        new CopyWebpackPlugin([
            { from: path.resolve(dir_src, 'index.html') } // to: output.path
        ]),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ]
};
```

Configuración de algunos comandos en nuestro package.json.

```javascript
"scripts": {
  "build-dev": "webpack",
  "build-prod": "webpack --optimize-minimize"
},
```

Ahora si arrancamos el build, y comprobamos bajo el directorio build, podemos ver que _div_, _mul_, _substract_ están marcados como que no estan en uso.

```
npm run build-dev
```

Si miramos en el _bundle.js_ generado encontraremos las siguientes entradas:

```
/* harmony export */ exports["sum"] = sum;/* ununsed harmony export substract */;/* ununsed harmony export mul */;/* ununsed harmony export div */;
```

Si queremos obtener una version minificada de este achivo js (la cual no contendrá los ununsed exports):

```
npm run build-prod
```

Si ejecutamos el build de producción, estos no se incluiran en el build.

# Referencia

Algunos ejemplos de interés si quieres continuar aprendiendo:

https://github.com/webpack/webpack/tree/master/examples/harmony-unused

https://github.com/rauschma/tree-shaking-demo/blob/master/webpack.config.js

https://github.com/blacksonic/babel-webpack-tree-shaking
