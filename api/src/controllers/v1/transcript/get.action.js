import 'dotenv/config';
import fs from 'fs';
import ejs from 'ejs';
import moment from 'moment';
import { StreamChat } from 'stream-chat';

import Chat from 'models/chat';
import StreamClient from 'utils/stream';

exports.get = async (req, res) => {
	try {
		const data = req.query;

		if (!process.env.POSTMARK_KEY) {
			return res.status(400).json({
				error:
					'Missing POSTMARK_KEY environment variable. Please add this to your .env file or Heroku settings.'
			});
		}

		const chat = await Chat.findById(data.chat);

		const { key, secret } = await StreamClient();
		const client = new StreamChat(key, secret);

		const channel = client.channel('commerce', data.chat);
		const { messages } = await channel.query({
			messages: { limit: 1000, offset: 0 },
			members: { limit: 2, offset: 0 }
		});

		const transcript = messages.map((message) => {
			return {
				name: message.user.name.split(' ')[0] + ' ' + message.user.name.split(' ')[1].charAt(0) + '.',
				text: message.text,
				timestamp: moment(message.created_at).format('LLLL')
			};
		});

		res.status(200).json(transcript);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
