# Ejemplo de módulos

En este ejemplo vamos a introducir el **Linting**. Se trata de una técnica que nos permite analizar el código en busca de errores potenciales, lo que ayuda a codificar con menos errores.

Vamos a empezar a partir del ejemplo _"00 Intro/03 output"_.

Resumen de pasos:
 - Instalación de ESLint.
 - Configuración de ESLint.
 - Conexión con Babel.
 - Conexión con Webpack.
 - Adición de reglas personalizadas.

# Pasos para construirlo

## Prerrequisitos

Necesitarás tener instalado [nodejs](https://nodejs.org/en/) (v. 6.3.1) en tu ordenador. Si quieres seguir esta guía, necesitarás tomar el ejemplo _"00 Intro/03 output"_ como punto de partida.

## Instalación y configuración

- [ESLint](http://eslint.org/) es una herramienta para _linting_ de nueva generación que nos permite el uso de reglas personalizadas, analizadores, plugins, etc.
Vamos a empezar por la descarga de la librería `eslint` a través de `npm`, en este caso vamos a ejecutar el siguiente comando desde la línea de comandos `npm install eslint --save-dev`:

```
npm install eslint --save-dev
```

![package.json tras instalar eslint](../../99 Readme Resources/02 Webpack/04 Misc/01 Linting/00 Install eslint.png)

- ESLint trabaja con Babel y la sintaxis de JSX mediante la instalación de plugins. Es decir, es una gran librería para desarrollar proyectos React. Este ejemplo es una demo, así que vamos a implementar una configuración básica.
Vamos a crear un archivo `.eslintrc.json` (existen muchas [opciones de formato de archivo](http://eslint.org/docs/user-guide/configuring#configuration-file-formats)) con el siguiente contenido:

#### .eslintrc.json
```json
{
  "extends": [
    "eslint:recommended"
  ],
  "env": {
    "browser": true
  }
}
```

- Esta es la configuración más básica donde estamos utilizando las [reglas por defecto](http://eslint.org/docs/rules/) proporcionadas por ESLint y estamos estableciendo el [entorno del navegador](http://eslint.org/docs/user-guide/configuring#specifying-environments) para definir las variables globales del navegador, como por ejemplo el objeto _window_.

- Podemos establecer un [comando de script de npm](https://docs.npmjs.com/misc/scripts) para ejecutar eslint de la siguiente forma:

#### package.json
```json
"scripts": {
  "start": "webpack-dev-server --inline",
  "lint": "eslint .",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

- Ejecutando este comando:

```
npm run lint
```

![eslint errors](../../99 Readme Resources/02 Webpack/04 Misc/01 Linting/01 ESLint errors.png)

- ESLint lanza dos errores de análisis debido al uso de las palabras clave _export_ e _import_. Las funcionalidades _import_ y _export_ son proporcionados por Babel para trabajar con módulos. Así que es hora de conectar ESLint con Babel:

```
npm install babel-eslint --save-dev
```

#### .eslintrc.json
```json
{
  "extends": [
    "eslint:recommended"
  ],
  "env": {
    "browser": true
  },
  "parser": "babel-eslint"
}
```

![resultado después de configurar eslint](../../99 Readme Resources/02 Webpack/04 Misc/01 Linting/02 Result after configuring babel-eslint.png)

- Como vemos, esta vez `npm run lint` no lanza ningún error, suena bien!. Pero queremos ejecutar ESLint mientras estamos escribiendo nuestro código. Es decir, el siguiente paso es conectar ESLint con Webpack.

- Debemos instalar `eslint-loader`:

```
npm install eslint-loader --save-dev
```

![package.json tras instalar eslint-loader](../../99 Readme Resources/02 Webpack/04 Misc/01 Linting/03 Install eslint-loader.png)

- Para configurar Webpack, vamos a utilizar la definición preloader. Nos aseguramos que ESLint analice el código antes que cualquier otro proceso. Tenemos un _webpack.config.js_ como este:

#### webpack.config.js
```javascript
...
module: {
  preLoaders: [
    {
      test: /\.js$/,
      loader: "eslint",
      exclude: /node_modules/,
    }
  ],
  loaders: [
    {
      test: /\.js$/,
      loader: "babel-loader",
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }
  ]
},
...
```

- Ahora podemos eliminar el comando npm anterior y ejecutar de nuevo `npm start`.

#### package.json
```json
...
"scripts": {
  "start": "webpack-dev-server --inline",
  "test": "echo \"Error: no test specified\" && exit 1"
},
...
```

![Webpack build después de configurar eslint-loader](../../99 Readme Resources/02 Webpack/04 Misc/01 Linting/04 Webpack build after configure eslint-loader.png)

- A simple vista, parece que no pasa nada con el build. Vamos a modificar el código
del fichero `students.js`:

#### ANTES students.js

```javascript
import {getAvg} from "./averageService"

const scores = [90, 75, 60, 99, 94, 30]
const averageScore = getAvg(scores);
const messageToDisplay = `average score ${averageScore}`;

document.write(messageToDisplay);
```

#### Typo: using _message_ instead of _messageToDisplay_

```javascript
import {getAvg} from "./averageService"

const scores = [90, 75, 60, 99, 94, 30]
const averageScore = getAvg(scores);
const messageToDisplay = `average score ${averageScore}`;

document.write(message);
```

![Typo](../../99 Readme Resources/02 Webpack/04 Misc/01 Linting/05 Typo in students.js.png)

## Definiendo reglas

- Como hemos visto anteriormente, estamos utilizando las [reglas por defecto de ESLint](http://eslint.org/docs/rules/)

#### .eslintrc.json
```json
{
  "extends": [
    "eslint:recommended"
  ],
  ...
}
```

- La buena noticia es que podemos [configurar todas estas reglas](http://eslint.org/docs/user-guide/configuring#configuring-rules) siguiendo estos valores:

  - `0` o `off` - Deshabilita la regla.
  - `1` o `warn` - Habilita la regla como un aviso.
  - `2` o `error` - Habilita la regla como un error.


- Por ejemplo, si modificamos `students.js` como se muestra a continuación:

```javascript
import {getAvg} from "./averageService"

const scores = [90, 75, 60, 99, 94, 30]
const averageScore = getAvg(scores);
const messageToDisplay = `average score ${averageScore}`;

console.log(messageToDisplay);
```

- Como resultado, obtenemos este error debido a que el uso de _console_ no está permitido de forma predeterminada.

![Usando console](../../99 Readme Resources/02 Webpack/04 Misc/01 Linting/06 Using console log.png)

- Podemos desactivar esta regla con la siguiente configuración:

```json
{
  "extends": [
    "eslint:recommended"
  ],
  "env": {
    "browser": true
  },
  "parser": "babel-eslint",
  "rules": {
    "no-console": 0
  }
}
```

![Deshabilitando la regla no-console](../../99 Readme Resources/02 Webpack/04 Misc/01 Linting/07 Disabling no-console rule.png)

- Otro ejemplo es la regla denominada [max-lines](http://eslint.org/docs/rules/max-lines) que _hace cumplir un número máximo de líneas por archivo, con el fin de ayudar en la facilidad de mantenimiento y reducir la complejidad_.

```json
{
  "extends": [
    "eslint:recommended"
  ],
  "env": {
    "browser": true
  },
  "parser": "babel-eslint",
  "rules": {
    "no-console": 0,
    "max-lines": ["error", 1]
  }
}
```

_NOTA:_ Podemos utilizar "error" o 2. Pero podemos leer mejor esta línea si usamos la palabra "error".

![Usando la regla max-lines](../../99 Readme Resources/02 Webpack/04 Misc/01 Linting/08 Using max-lines rule.png)

- Para integrar tslinter con proyectos basados en React podemos utilizar [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) que proporciona linting para el lenguaje JSX.
