# Prueba Técnica Full Stack

Este proyecto es una API desarrollada en Node.js + Express como parte de la prueba técnica para Higher Bit Solutions. Incluye 3 desafíos de los cuales tenia que elegir dos:

✅ Autenticación HMAC (seguridad),
❌ Paginación de órdenes (manejo de datos),
✅ Resumen de productos optimizado (performance),




## Instalación y Ejecución

1. Requisitos

    Node.js (v18+)

    npm

2. Configuración

```bash
# Clonar el repositorio
git clone [URL_DEL_REPO]

# Instalar dependencias
npm install

```
3. Comandos

```bash
# Iniciar el servidor
npm start	

# Ejecutar pruebas con test GENERAL
npm test

# Ejecutar pruebas con test para security
npm test test/security.test.js

#Ejecutar pruebas con test para orders
npm test test/orders.test.js
```

4. Generar headers de autenticación HMAC válidos para probar el endpoint seguro /api/me/secure

```bash
node generate-signature.js
```

Este comando te da los 3 parametros para ingresarlos y probarlos en [Endpoint seguro con autenticación HMAC](http://localhost:3000/api-docs)

## Accede a la documentación interactiva:

[Documentación](http://localhost:3000/api-docs)

## Authors

- [@gbaeza2002](hhttps://github.com/gbaeza2002)

