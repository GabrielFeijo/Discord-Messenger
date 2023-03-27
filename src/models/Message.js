const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
	message_id: String,
	title: String,
	description: String,
	author: { username: String, avatarURL: String },
	link: String,
	thumbnail: String,
	color: String,
	footer: String,
});

mongoose.model('message', MessageSchema);
