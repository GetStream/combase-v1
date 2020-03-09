import 'dotenv/config';
import fs from 'fs';
import ejs from 'ejs';
import moment from 'moment';
import nodemailer from 'nodemailer';
import postmark from 'nodemailer-postmark-transport';
import { StreamChat } from 'stream-chat';

import Chat from 'models/chat';
import StreamClient from 'utils/stream';

exports.post = async (req, res) => {
	try {
		const data = req.params;

		if (!process.env.POSTMARK_KEY) {
			return res.status(400).json({
				error:
					'Missing POSTMARK_KEY environment variable. Please add this to your .env file or Heroku settings.'
			});
		}

		const chat = await Chat.findById(data.chat);

		const transport = nodemailer.createTransport(
			postmark({
				auth: {
					apiKey: process.env.POSTMARK_KEY
				}
			})
		);

		const { key, secret } = await StreamClient();
		const client = new StreamChat(key, secret);

		const channel = client.channel('commerce', data.chat);
		const { messages } = await channel.query({
			messages: { limit: 1000, offset: 0 },
			members: { limit: 2, offset: 0 }
		});

		const transcript = messages.map((message) => {
			return {
				ts: moment(message.created_at).format('LLLL'),
				name: message.user.name.split(' ')[0] + ' ' + message.user.name.split(' ')[1].charAt(0) + '.',
				text: message.text
			};
		});

		const html = ejs.render(fs.readFileSync(__dirname + '/../../../utils/email/transcript.ejs', 'utf8'), {
			transcript
		});

		await transport.sendMail({
			from: chat.refs.organization.email.address,
			to: chat.refs.user.email,
			subject: `${chat.refs.organization.name} Chat Transcript on ${moment(chat.createdAt).format(
				'LLLL'
			)} (Chat #${data.chat})`,
			html
		});

		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
