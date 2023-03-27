require('dotenv').config();

module.exports = {
	url_db: process.env.DB || 'mongodb://localhost:27017/Discord',
	host: process.env.HOSTNAME || 'http://localhost',
	port: process.env.PORT || 4000,
	webhook:
		process.env.URL_WEBHOOK || 'https://discord.com/api/webhooks/id/token',
};
