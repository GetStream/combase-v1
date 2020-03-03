import 'dotenv/config';
import { StreamChat } from 'stream-chat';

import Chat from 'models/chat';
import StreamClient from 'utils/stream';

exports.post = async (req, res) => {
	try {
		const data = req.body;

		const { agents: { assignee: { agent } }, organization, user } = data.refs;

		const create = await Chat.create(data);

		const { key, secret } = await StreamClient();
		const client = new StreamChat(key, secret);
		const channel = client.channel('commerce', create._id.toString(), {
			members: [agent, user],
			roles: {
				agent: 'moderator',
				user: 'channel_member'
			},
			created_by_id: user,
			organization
		});

		await channel.create();

		const agentToken = client.createToken(agent);
		const userToken = client.createToken(user);
		console.log('channel', channel.state);
		res.status(200).json({
			...create,
			tokens: {
				agent: agentToken,
				user: userToken
			}
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
