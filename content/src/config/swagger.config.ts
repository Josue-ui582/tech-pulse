import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tech Pulse App - Agrégateur de News Hybride',
      version: '1.0.0',
      description: 'Les APIs de la plateforme Tech Pule documentées avec swagger',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Local development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/server.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
