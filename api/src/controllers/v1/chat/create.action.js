import 'dotenv/config';
import moment from 'moment';
import { StreamChat } from 'stream-chat';

import Chat from 'models/chat';
import Agent from 'models/agent';
import StreamClient from 'utils/stream';

exports.post = async (req, res) => {
	try {
		const { agent } = req.params;
		const data = req.body

		const { meta: { subject }, refs: { organization, user } } = data;

		const ts = moment().format('dddd H').split(' ');
		const day = ts[0].toLowerCase();
		const time = parseInt(ts[1], 10);

		const chat = await Chat.create({
			meta: { subject },
			refs: { user, organization, agents: { assignee: { agent } } }
		});

		const { key, secret } = await StreamClient();
		const client = new StreamChat(key, secret);
		const channel = client.channel('commerce', chat._id.toString(), {
			members: [agent, user],
			roles: {
				agent: 'moderator',
				user: 'channel_member'
			},
			created_by_id: user,
			organization
		});

		await channel.create();

		const agentToken = client.createToken(agent._id.toString());
		const userToken = client.createToken(user);

		res.status(200).json({
			agent: {
				id: chat.refs.agents.assignee.agent._id,
				name: chat.refs.agents.assignee.agent.name
			},
			user: {
				id: chat.refs.user._id,
				name: chat.refs.user.name
			},
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
