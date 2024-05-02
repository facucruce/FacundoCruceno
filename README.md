# Facundo Cruceño

## Descripción
Esta es una aplicación desarrollada en Angular para visualizar los diferentes productos financieros ofertados por la Institución Banco. La aplicación cuenta con pantallas para la carga, edición y eliminación de productos financieros.

## Instalación
Para instalar y ejecutar el proyecto, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
2. Asegúrate de tener Node.js y npm instalados.
3. Ejecuta el siguiente comando en la raíz del proyecto para instalar las dependencias:
    npm install
4. Una vez instaladas las dependencias, puedes ejecutar la aplicación con el siguiente comando:
    ng serve --proxy-config proxy.conf.json

## Estructura del Proyecto
El proyecto está organizado de la siguiente manera:

Core: Contiene las funcionalidades que no tienen vistas y que se comparten en toda la aplicación, como los modelos y los servicios.

Products: Es el módulo principal que contiene las rutas y las pantallas relacionadas con los productos financieros.

Shared: Contiene los componentes que se comparten entre diferentes partes de la aplicación, como el formulario y un modal genérico.

## Pruebas Unitarias
Se han incluido pruebas unitarias para cada componente utilizando Jest. Para ejecutar estas pruebas, utiliza el siguiente comando:

npm run test
