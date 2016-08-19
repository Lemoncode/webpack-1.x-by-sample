# Ejemplo de módulos

En este ejemplo comenzaremos a trabajar con módulos es6 (import).

Partiendo de los pasos del ejemplo 00 Intro / 00 BoilerPlate añadiremos un nuevo fichero JavaScript que
implemente un algoritmo simple para calcular el promedio de una matriz de puntuaciones.

Usaremos este nuevo array Javascript en el fichero principal, students.js, realizando una importación de él.

Pasos:
 - Añadir un nuevo fichero averageService.js
 - Añadir un array en students.js
 - Importar averageService en students.js.
 - Usar averageService dentro del código de students.js.
 - Transpilar y testear con index.html


# Pasos para construirlo

## Prerrequisitos

Necesitarás tener instalado [nodejs] (https://nodejs.org/en/) (v. 6.3.1) en tu ordenador. Tomaremos como referencia de inicio el ejemplo "00 Intro / 00 BoilerPlate".

## Pasos

- Añade un nuevo fichero con nombre averageService.js. Este fichero contendrá una función que calculará el valor medio de un array dado. La función se exportará (export) para hacerla visible a otros módulos que necesiten consumirla:

```javascript
export function getAvg(score) {
  return score.reduce(function (p, c) {
    return p + c;
  }) / score.length;
}
```

- Ahora actualizaremos students.js para que importe este nuevo fichero y pueda utilizarlo.

```javascript
import {getAvg} from "./averageService"

const scores = [90, 75, 60, 99, 94, 30]
const averageScore = getAvg(scores);
const messageToDisplay = `average score ${averageScore}`;

document.write(messageToDisplay);
```

- Ejecutaremos webpack desde la línea de comandos y al pinchar en index.html veremos que la nueva función está levantada, ejecutándose y ha sido incluida en el fichero bundle.js.

## Apéndice - Jugando con la importación

- una forma popular es el uso de "export default" indicando que por defecto la función getAvg será la que se exporta. A continuación podemos utilizar directamente una importación "alias", siendo en este punto donde indicaremos nuestra función getAvg:

Exportar por defecto. (averageService.js)

```javascript
export default function getAvg(score) {
  return score.reduce(function (p, c) {
    return p + c;
  }) / score.length;
}
```

Importar y usar. (students.js)

```javascript
import getAvg from "./averageService"

const scores = [90, 75, 60, 99, 94, 30]
const averageScore = getAvg(scores);
const messageToDisplay = `average score ${averageScore}`;

document.write(messageToDisplay);
```


- Otra forma de utilizar import es usar * para indicar que deseamos importar cualquier cosa de un módulo.
Añadiremos al módulo students.js la función getSum con el fin de mostrar esta posibilidad.

Múltiples exportaciones. (averageService.js):

````javascript
export function getAvg(score) {
  return score.reduce(function (p, c) {
    return p + c;
  }) / score.length;
}

export function getSum(score) {
  return score.reduce(function (p, c) {
    return p + c;
  });
}
````

Importar y usar módulo completo. (students.js)
````javascript
import * as stats from "./averageService"

const scores = [90, 75, 60, 99, 94, 30]
const averageScore = stats.getAvg(scores);
const sumScore = stats.getSum(scores);
const messageToDisplayAvg = `average score ${averageScore}`;
const messageToDisplaySum = `sum score ${sumScore}`;

document.write(messageToDisplayAvg);
document.write(messageToDisplaySum);
````
