# Configuración del Archivo `.env`

El archivo `.env` contiene las variables de entorno necesarias para configurar y ejecutar la aplicación. A continuación, se describen las variables incluidas y su propósito:

## Variables de Entorno

- **`PORT`**: Define el puerto en el que se ejecutará el servidor. Por defecto, está configurado en `5000`.
- **`PAYMENT_API_KEY`**: Clave API utilizada para autenticar las solicitudes al servicio de pagos. 
- **`CLIENT_URL`**: URL del cliente que interactúa con esta API. Por defecto, está configurada en `http://localhost:3000`.
- **`NODE_ENV`**: Define el entorno de ejecución de la aplicación. Los valores comunes son:
  - `development`: Para desarrollo local.
  - `production`: Para despliegue en producción.

## Configuración y Despliegue

### Requisitos Previos

1. **Node.js**: Asegúrate de tener instalado Node.js en tu sistema.
2. **Dependencias**: Instala las dependencias del proyecto ejecutando:
   ```bash
   npm install