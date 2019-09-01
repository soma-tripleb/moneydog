const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'MoneyDog Server',
		version: '1.0.0',
		description: 'API Document',
	},
	basePath: '/',
};

const options = {
	swaggerDefinition: swaggerDefinition,
	apis: ['./components/subscriptionController.js', './swagger.yaml'],
};

module.exports = swaggerJSDoc(options);