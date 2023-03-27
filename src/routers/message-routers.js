const express = require('express');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const mongoose = require('mongoose');
const config = require('../config');

const messageRouter = express.Router();
const webhookClient = new WebhookClient({
	url: config.webhook,
});

require('../models/Message');
const Message = mongoose.model('message');

messageRouter.post('/message', (req, res) => {
	// #swagger.tags = ['Message']
	// #swagger.description = 'Endpoint para enviar uma nova mensagem.'
	/*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'A mensagem será enviada para o discord e salva no Banco de dados.',
                schema: {
                    $title: 'Nova notícia',
                    $description: 'Equipe do Google DeepMind criou um modelo de IA capaz de prever a estrutura de proteínas com alta precisão.',
					$author: { $username: 'Gabriel', $avatarURL: 'https://via.placeholder.com/50x50'},
                    $link: 'https://www.google.com',
					$thumbnail: 'https://via.placeholder.com/50x50',
					$color: '#ff0000',
					$footer: 'News'

                }
        } */
	try {
		const message = req.body;

		const embed = new EmbedBuilder()
			.setTitle(message.title)
			.setDescription(message.description)
			.setThumbnail(message.thumbnail)
			.setURL(message.link)
			.setColor(message.color)
			.setFooter({ text: message.footer })
			.setTimestamp();

		webhookClient
			.send({
				username: message.author.username,
				avatarURL: message.author.avatarURL,
				embeds: [embed],
			})
			.then((data) => {
				const msg = new Message(message);
				msg.message_id = data.id;
				msg
					.save()
					.then((data) => {
						res.send(data);
					})
					.catch((err) => {
						res.send(err.message);
					});
			})
			.catch((err) => res.status(400).status(err.message));
	} catch (e) {
		res.status(400).send(e);
	}
});

messageRouter.get('/messages', (req, res) => {
	// #swagger.tags = ['Message']
	// #swagger.description = 'Endpoint para listar todas as mensagens.'
	Message.find()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send(err.message);
		});
});

messageRouter.get('/message/:id', (req, res) => {
	// #swagger.tags = ['Message']
	// #swagger.description = 'Endpoint para buscar uma mensagem por ID.'
	// #swagger.parameters['id'] = { description: 'ID da mensagem enviada ao discord.' }
	Message.findOne({ message_id: req.params.id })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.send(err.message);
		});
});

messageRouter.put('/message/:id', async (req, res) => {
	// #swagger.tags = ['Message']
	// #swagger.description = 'Endpoint para editar uma mensagem já enviada.'
	// #swagger.parameters['id'] = { description: 'ID da mensagem enviada ao discord.' }
	/*  #swagger.parameters['obj'] = {
                in: 'body',
                description: 'A mensagem será editada no o discord e no Banco de dados',
                schema: {
					$_id: 'ID gerado pelo banco de dados',
                    $title: 'Mudança da notícia',
                    $description: 'Equipe do Google DeepMind criou um modelo de IA capaz de prever a estrutura de proteínas com alta precisão.',
                    $link: 'https://www.google.com',
					$thumbnail: 'https://via.placeholder.com/50x50',
					$color: '#ff0000',
					$footer: 'Edited'

                }
        } */
	try {
		const message = req.body;

		const embed = new EmbedBuilder()
			.setTitle(message.title)
			.setDescription(message.description)
			.setThumbnail(message.thumbnail)
			.setURL(message.link)
			.setColor(message.color)
			.setFooter({ text: message.footer })
			.setTimestamp();

		await webhookClient.editMessage(req.params.id, {
			embeds: [embed],
		});
		Message.findByIdAndUpdate(
			{ _id: message._id },
			{
				title: message.title,
				description: message.description,
				link: message.link,
				thumbnail: message.thumbnail,
				color: message.color,
				footer: message.footer,
			}
		)
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.send(err.message);
			});
	} catch (e) {
		res.status(404).send('Mensagem não econtrada!');
	}
});

messageRouter.delete('/message/:id', async (req, res) => {
	// #swagger.tags = ['Message']
	// #swagger.description = 'Endpoint para deletar uma mensagem por ID.'
	// #swagger.parameters['id'] = { description: 'ID da mensagem enviada ao discord.' }
	try {
		await webhookClient.deleteMessage(req.params.id);
		Message.findOneAndRemove({ message_id: req.params.id })
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.send(err.message);
			});
	} catch (e) {
		res.status(404).send('Mensagem não econtrada!');
	}
});

module.exports = messageRouter;
