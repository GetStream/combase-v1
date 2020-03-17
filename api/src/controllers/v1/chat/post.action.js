import 'dotenv/config';
import moment from 'moment';
import { StreamChat } from 'stream-chat';

import Chat from 'models/chat';
import Agent from 'models/agent';
import StreamClient from 'utils/stream';

exports.post = async (req, res) => {
	try {
		const data = req.body;

		const { organization, user } = data.refs;

		const agents = await Agent.find({ active: true }).lean();

		const ts = moment().format('dddd H').split(' ');
		const day = ts[0].toLowerCase();
		const time = parseInt(ts[1], 10);

		const available = agents
			.map((agent) => {
				const a = agent.availability[day];

				if (a.enabled) {
					if (time >= a.hours.from && time <= a.hours.to) {
						return agent._id;
					}
				}

				return [];
			})
			.flat(1);

		const agent = available[Math.floor(Math.random() * available.length)];

		const chat = await Chat.create(...data, { agents: { assignee } });

		const { key, secret } = await StreamClient();
		const client = new StreamChat(key, secret);
		const channel = client.channel('commerce', chat._id.toString(), {
			members: [ agent, user ],
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

		res.status(200).json({
			...chat,
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
