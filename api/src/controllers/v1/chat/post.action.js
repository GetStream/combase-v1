import 'dotenv/config';
import { StreamChat } from 'stream-chat';

import Chat from 'models/chat';
import StreamClient from 'utils/stream';
import { AddToWebhookChatQueue } from 'workers/webhook-chat/queue';

exports.post = async (req, res) => {
	try {
		const { user, agent, chat, organization } = req.body;

		const create = await Chat.create({
			chat,
			refs: {
				user,
				agent,
				organization,
			},
		});

		const { key, secret } = await StreamClient();
		const client = new StreamChat(key, secret);
		const channel = client.channel('messaging', create._id.toString(), {
			type: 'messaging',
			members: [agent, user],
			roles: {
				agent: 'moderator',
				user: 'channel_member',
			},
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
