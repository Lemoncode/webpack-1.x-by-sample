# Ejemplo de Módulos

En este fichero vamos a entrar en "modo desarrollador", el trabajo con archivos de servicios no es ideal cuando se está desarrollando una aplicación web, vamos a aprender cómo poner en marcha un servidor web _lite_, cómo desplegar nuestro paquete en una carpeta distinta (incluyendo index.html), cómo depurar directamente nuestro código es6 en el depurador de navegador y minimizar nuestro bundle.js.

Partiendo de los pasos del ejemplo 00 Intro / 01 Import, instala webpack-dev-server, configura nuestro config para desplegar en la carpeta de configuración y soporte de mapas (depuración), entonces vamos a minimizar nuestro archivo bundle.js a través de parámetros webpack cli.

Pasos:
 - Instala a tráves de npm webpack-dev-server.
 - Ejecuta webpack-dev-server con recarga automática.
 - Añadir comando start en package.json.

# Pasos para construirlo

## Prerrequisitos

Necesitarás tener instalado [nodejs] (https://nodejs.org/en/) (v. 6.3.1) en tu ordenador. Tomaremos como referencia de inicio el ejemplo "00 Intro / 01 Import".

## Pasos

- Vamos a instalar webpack-dev-server este paquete se envía con un servidor lite que se puede utilizar como servidor de desarrollo web. Esta vez tenemos que instalar este paquete como una dependencia global (tenga en cuenta el parámetro "-g")

````
npm install webpack-dev-server -g
````

- Ejecutaremos webpack-dev-server desde la línea de comandos, esto va a poner en marcha nuestro servidor de desarrollo web, en este caso en el puerto 8080

![localhost](../../99 Readme Resources/02 Webpack/Demo02_localhost.png "Demo02_localhost.png")


- En un navegador podemos indicar la url http://localhost:8080 y vamos a navegar por nuestra aplicación web

![npm init](../../99 Readme Resources/02 Webpack/Demo03_browser.png "Demo03_browser.png")



- Una característica interesante que incluye este servidor de desarrollo es la recarga automática, si añadimos una actualización en cualquiera de los archivos javascript se detectará automáticamente y el servidor webpack de desarrollo pone en marcha el proceso de compilación y una vez terminado automáticamente actualiza la página que está en el navegador. Con el fin de hacer esto tenemos que llamar webpack-dev-server con un parámetro adicional:

![npm init](../../99 Readme Resources/02 Webpack/Demo02_inline.png "Demo02_inline.png")

- No es necesario recordar esto parametros cada vez que queremos iniciar nuestro servidor de desarrollo, con el fin de evitar esto podemos simplemente añadir el comando "start" en nuestro package.json

![npm init](../../99 Readme Resources/02 Webpack/Demo03_Start.png "Demo03_Start.png")

- Una vez que hemos guardado este cambio podemos ejecutar directamente desde la línea de comandos

````
npm start
````

- Ahora que estamos utilizando este enfoque, no es necesario tener webpack-dev-server global, podríamos instalarlo en la parada del proyecto y usar "npm start" para iniciarlo.

````
npm install webpack-dev-server --save-dev
````


Y así tenemos el servidor de desarrollo en marcha y funcionando.
