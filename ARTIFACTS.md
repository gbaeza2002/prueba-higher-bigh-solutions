# Librerias agregadas
1.- Jest: Se implementó Jest como framework de pruebas para garantizar la calidad del código en los micro-desafíos.

2.- Nodemon: Se utilizó en el entorno de desarrollo para Agilizar la iteración al detectar cambios automáticamente y reiniciar el servidor.

3.- Swagger: Se integró swagger-ui-express y swagger-jsdoc para documentar profesionalmente la API siguiendo el estándar OpenAPI.
            Facilitar pruebas de endpoints complejos como /me/secure (HMAC), mostrando headers requeridos y ejemplos.
            Demostrar buenas prácticas de mantenibilidad, aunque no era un requisito explícito. La interfaz visual (/api-docs) permite ver rápidamente la estructura de la API.

# Archivo generate-signature.js

Este script genera headers de autenticación HMAC válidos para probar el endpoint seguro /api/me/secure. Crea una firma digital usando el mismo algoritmo que el servidor.

# Tiempo total invertido

Inverti un total de aproximadamente 4 horas.

# Observaciones

1. Para esta prueba técnica decidí definir el valor de SECRET directamente en el código (process.env.SECRET = "devsecret"), ya que en mi entorno Windows no funcionaba correctamente el comando set SECRET=devsecret. Soy consciente de que en un entorno real esta no es una práctica segura y se debería usar un gestor de secretos o un archivo .env con dotenv. Sin embargo, al tratarse de una prueba técnica con tiempo limitado, prioricé la simplicidad y asegurar el correcto funcionamiento de los tests y del middleware authSigned.

2. Al agregar un test para verificar que authSigned devolviera 500 cuando faltaba la variable SECRET, el caso falló. Creo que esto se debe a que definí manualmente process.env.SECRET = "devsecret" en el código para que el middleware funcionara durante la prueba. Al sobrescribirla en el test con undefined, no se reflejó el comportamiento esperado. Considero que este problema ocurre porque el SECRET quedó hardcodeado y no gestionado realmente como una variable de entorno.

# PROMPTS ACEPTADOS
## Prompt 1: - Error al iniciar proyecto. 

Estoy trabajando en un proyecto con **Node.js y Express**, pero al ejecutar `npm start` me aparece el siguiente error:

    hbs-fs-test@1.0.0 start
    node src/server.js

    (node:13180) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
    (Use node --trace-warnings ... to show where the warning was created)

    C:\Users\Graciany\Desktop\prueba-fullstack-graciany-baeza\src\server.js:1
    import express from "express";
    ^^^^^^

    SyntaxError: Cannot use import statement outside a module
    at internalCompileFunction (node:internal/vm:77:18)
    at wrapSafe (node:internal/modules/cjs/loader:1288:20)
    at Module._compile (node:internal/modules/cjs/loader:1340:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
    at Module.load (node:internal/modules/cjs/loader:1207:32)
    at Module._load (node:internal/modules/cjs/loader:1023:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:135:12)
    at node:internal/main/run_main_module:28:49

    Node.js v20.11.0

Necesito ayuda para entender por qué ocurre este error y cómo solucionarlo correctamente en mi proyecto.

## Prompt 2: - Comparación segura de firmas HMAC

Necesito una función en Node.js que realice una comparación de cadenas de texto de forma segura para evitar ataques de temporización (timing attacks). La función debe ser un wrapper que tome dos buffers o strings como entrada y devuelva un booleano. No debe devolver el control antes de tiempo si las longitudes son diferentes. Dame un ejemplo de cómo usarla para comparar una firma digital en formato hexadecimal con una firma calculada localmente.


## Prompt 3: - Recomendación implementación de comparación segura de firmas HMAC

Estoy trabajando en un proyecto Node.js y necesito decidir entre usar el test runner nativo de Node.js `node --test` y Jest. Considerando que es una aplicación sencilla con Express y necesito escribir al menos un test por desafío, ¿cuál es la mejor opción? ¿Cuáles son las ventajas de cada uno para este contexto?


## Prompt 4: - Solicitud de recomendaciones para casos de prueba para validar resumen de ordenes
Estoy trabajando en la prueba técnica de Higher Bit Solutions y necesito mejorar los tests de mi función `productSummaryLinear` en el archivo `orders.test.js`. Actualmente tengo estos casos de prueba:

    1. Verifica que el total de items coincida
    2. Verifica que el total de amount coincida
    3. Verifica el ordenamiento descendente por amount
    4. Compara resultados con la versión quadratic

¿Podrías recomendarme al menos 5 casos de prueba adicionales que debería considerar para mejorar la cobertura de testing? Para cada caso:

    1. Indica qué aspecto específico de la función estaría probando
    2. Explica por qué es importante probar ese caso
    3. Proporciona un ejemplo concreto de los datos de entrada que usarías
    4. Menciona qué afirmaciones (assertions) serían relevantes incluir

Quiero enfocarme especialmente en:
- Casos bordes que podrían romper la función
- Situaciones de data realista pero compleja
- Validación de la estructura de salida
- Rendimiento con datos grandes (aunque sean tests unitarios)

Los nuevos tests deberían complementar los existentes sin duplicar cobertura. Por favor organiza las recomendaciones de forma clara y justifica cada una.

## Prompt 5: - Generación de Documentación API con Swagger/JSDoc
Genera documentación Swagger básica en routes.js usando JSDoc. Incluye:

    - Tags para Authentication, Orders y Products.

    - Descripción breve de cada endpoint.

    - Parámetros esenciales (headers, queries).

    - Responses (200, 400, 401).

Mantén la sintaxis concisa.

## PROPMTS RECHAZADOS

## Prompt 1: - 

Estoy recibiendo un "SyntaxError: Cannot use import statement outside a module" cuando intento ejecutar mis tests con Jest en Node.js. Mi `package.json` tiene `"type": "module"` y los archivos usan `import` y `export`, pero Jest no parece reconocerlos. ¿Cuál es el problema de configuración más común para este error al usar Jest con módulos ES? ¿Necesito una configuración especial para que Jest funcione correctamente con ellos?

Respuesta: 

La IA propuso una solución incompleta que sugería crear un archivo jest.config.js con el siguiente contenido:

    // jest.config.js
    export default {
    testEnvironment: "node",
    transform: {},
    extensionsToTreatAsEsm: [".js"],
    };

La solución de la IA no funcionó por sí sola. Aunque extensionsToTreatAsEsm es parte de la configuración, el problema fundamental radica en cómo Node.js ejecuta Jest con los módulos ES. Jest aún utiliza APIs experimentales para el soporte de ESM, y estas no están activas por defecto al ejecutar jest desde la línea de comandos.

Para que Jest pueda interpretar correctamente las sentencias import, Node.js debe ser invocado con el flag --experimental-vm-modules. Mi solución final y funcional fue modificar el script de prueba en package.json para incluir este flag:

    // package.json
    "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
    }

Decidí que la solución más robusta y que mejor se adapta a los requisitos del proyecto (evitar librerías adicionales como Babel) era la de usar directamente el flag de Node.js. Esto no solo resuelve el problema de la sintaxis import, sino que también me permite usar Jest de forma nativa con el runner de Node, cumpliendo con los requisitos del desafío.


