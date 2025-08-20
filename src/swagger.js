import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Higher Bit Solutions - Prueba Técnica API',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                HMACAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-signature',
                    description: 'HMAC_SHA256(userId + timestamp, SECRET)'
                }
            }
        }
    },
    apis: ['./src/routes.js'], 
};

const specs = swaggerJsdoc(options);

export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};