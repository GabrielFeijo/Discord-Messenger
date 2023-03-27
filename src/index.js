const express = require('express');
const cors = require('cors');
const mainRoutes = require('./routers/message-routers.js');
const config = require('./config');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');

require('./db.js');

// App Express
const app = express();

app.use(function (req, res, next) {
	next();
});

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint raiz
app.get('/', (req, res) => {
	res.send('Bem-vindo!');
});
// Cors
app.use(
	cors({
		origin: ['http://localhost:3000'],
	})
);

// Rotas
app.use('/api', mainRoutes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Resposta padrão para quaisquer outras requisições:
app.use((req, res) => {
	res.status(404).send();
});
// Inicia o sevidor
app.listen(config.port, () => {
	console.log(`Servidor rodando com sucesso ${config.host}:${config.port}`);
});
