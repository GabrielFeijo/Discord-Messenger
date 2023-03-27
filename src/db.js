const mongoose = require('mongoose');
const config = require('./config');

mongoose.set('strictQuery', true);

async function main() {
	mongoose.connect(config.url_db);

	console.log('Consegui me conectar com sucesso ao banco!');
}

main().catch((err) => console.log(err));

module.exports = main;
