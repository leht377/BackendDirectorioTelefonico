# BackendDirectorioTelefonico  🧥

## Intalación

Para instalar las dependecias del proyecto ejectural el siguiente comando en la terminal estando en la raiz del mismo: 

    npm run install

## Configuracion
Se deben de hacer una serie de configuraciones para que el programa puede ser ejecutado.

1. Crear el archivo .env en la raiz del proyecto
2. crear las siguientes variables de entorno en el archivo .env:

    - MONGODB_URI='URI DE LA CONEXIÓN, ESTA DEBE ESCRIBIRSE ENTRE COMILLAS SIMPLES '
    - PORT = PUERTO DONDE SE VA A EJECUTAR EL SERVIDOR EJ: 3001
    - SECRET = 'DEFINIR UNA PALABRA SECRETA QUE NOS SERVIRA PARA EL FIRMADO DIGITAL DE JWT'

## Ejecución
  
Ejectural el siguiente comando en la terminal para levantar el servidor en modo desarrollo:

    npm run dev
