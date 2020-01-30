import 'dotenv/config';
import { StreamChat } from 'stream-chat';

import Chat from 'models/chat';
import { AddToWebhookChatQueue } from 'workers/webhook-chat/queue';

exports.post = async (req, res) => {
	try {
		const { user, agent, chat, organization } = req.body;

		let streamKey;
		let streamSecret;

		// if this env is found, it's assumed that the api is running on heroku
		if (process.env.STREAM_URL) {
			// extract the key and secret from the environment variable
			[streamKey, streamSecret] = process.env.STREAM_URL.substr(8)
				.split('@')[0]
				.split(':');
		} else {
			// api key and secret were provided from a .env file
			streamKey = process.env.STREAM_API_KEY;
			streamSecret = process.env.STREAM_API_KEY;
		}

		const create = await Chat.create({
			chat,
			refs: {
				user,
				agent,
				organization,
			},
		});

		const client = new StreamChat(streamKey, streamSecret);
		const channel = client.channel('messaging', create._id.toString(), {
			type: 'messaging',
			members: [agent, user],
			organization,
		});

		await channel.create();

		const agentToken = client.createToken(agent);
		const userToken = client.createToken(user);

		await AddToWebhookChatQueue('added', chat);

		res.status(200).json({
			...create,
			tokens: {
				agent: agentToken,
				user: userToken,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
