const swaggerAutogen = require('swagger-autogen')();

const doc = {
	info: {
		version: '1.0.0',
		title: 'Discord Messenger',
		description:
			'Com essa aplicação, é possível personalizar mensagens para serem enviadas para canais específicos no Discord, com conteúdo direcionado para públicos específicos.',
	},
	host: 'localhost:4000/api',
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routers/message-routers.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
	require('./src/index');
});
