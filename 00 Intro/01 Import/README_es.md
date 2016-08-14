# Ejemplo de módulos

En este ejemplo comenzaremos a trabajar con módulos es6 (import).

Partiendo de la muestra 00 Intro / 00 BoilerPlate añadiremos un nuevo fichero JavaScript que
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

Necesitarás tener instalado [nodejs] (https://nodejs.org/en/) (v. 6.3.1) en tu ordenador. Si quieres seguir esta guía de pasos necesitarás tomar como referencia de inicio el ejemplo "00 Intro / 00 BoilerPlate"

## Pasos

- Añade un nuevo fichero con nombre averageService.js. Este fichero contendrá una función que calculará el valor medio de un array dado. La función se exportará (export) para hacerla visible a otros módulos que necesiten consumirla.

```javascript
export function getAvg(score) {
  return score.reduce(function (p, c) {
    return p + c;
  }) / score.length;
}
```

- Ahora actualizaremos students.js para que importe este nuevo fichero y pueda utilizarlo.

```javascript
import {averageService} from "./averageService"

const scores = [90, 75, 60, 99, 94, 30]
const averageScore = averageService(scores);
const messageToDisplay = `average score ${averageScore}`;

document.write(messageToDisplay);
```

- Ejecutaremos webpack desde la línea de comandos y al pinchar en index.html veremos que la nueva función está levantada y ejecutándose y ha sido incluida en el fichero  bundle.js.

![npm init](../../99 Readme Resources/02 Webpack/Demo00_npminit.png "Demo01_Import.png")

## Apéndice - Jugando con la importación

- Other ways to use modules, one popular way is to use "export default"
indicating that by default the average function will be the one exported, then
we can directly use an import "alias" and this will point out to our averarge function.
Otras formas de utilizar los módulos, una forma popular es el uso de "export default"
lo que indica que, por defecto la función average será el que se exporta, a continuación,
podemos utilizar directamente una importación "alias", siendo este punto señalar que nuestra función averarge.

Export default (averageService.js)

```javascript
export default function getAvg(score) {
  return score.reduce(function (p, c) {
    return p + c;
  }) / score.length;
}
```

Import and usage (students.js)

```javascript
import getAvg from "./averageService"

const scores = [90, 75, 60, 99, 94, 30]
const averageScore = getAvg(scores);
const messageToDisplay = `average score ${averageScore}`;

document.write(messageToDisplay);
```


- Another way to use import is to use "*" to indicate we want to import everything
from that module, let's add for the sake of this sample two functions sum and average,
then on the main students file we can import everything provides an alias and use
the function we need.

Several Exports (AverageService)

````
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

Import * and usage sum + average

````
import * as stats from "./averageService"

const scores = [90, 75, 60, 99, 94, 30]
const averageScore = stats.getAvg(scores);
const sumScore = stats.getSum(scores);
const messageToDisplayAvg = `average score ${averageScore}`;
const messageToDisplaySum = `sum score ${sumScore}`;

document.write(messageToDisplayAvg);
document.write(messageToDisplaySum);
````
