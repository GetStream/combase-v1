import 'dotenv/config';
import moment from 'moment';
import { StreamChat } from 'stream-chat';

import Chat from 'models/chat';
import Agent from 'models/agent';
import StreamClient from 'utils/stream';

// Used for creating a chat from the widget
// Only adds a user to the chat so there is one member. 
// Also sets stauts to 'Waiting' so we can start to 
// round-robin and assign an agent.

exports.post = async (req, res) => {
	try {
		const { meta, organization, user, initialMessage } = req.body;

		const chat = await Chat.create({
			meta,
			refs: {
				organization,
				user: user._id,
			}
		});

		const { key, secret } = await StreamClient();
		const client = new StreamChat(key, secret);

		await client.setUser({
			id: user._id,
			name: user.name,
			role: 'user',
		});

		const channel = client.channel('commerce', chat._id.toString(), {
			members: [user._id],
			roles: {
				agent: 'moderator',
				user: 'channel_member'
			},
			created_by_id: user._id,
			organization
		});

		await channel.create();

		await channel.sendMessage({ text: initialMessage });

		const userToken = client.createToken(user._id);

		res.status(200).json({
			_id: chat._doc._id,
			tokens: {
				user: userToken
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
