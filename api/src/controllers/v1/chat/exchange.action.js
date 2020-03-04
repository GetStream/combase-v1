import 'dotenv/config';
import { StreamChat } from 'stream-chat';

import Agent from 'models/agent';
import Chat from 'models/chat';
import StreamClient from 'utils/stream';

exports.exchange = async (req, res) => {
	try {
		const data = req.body;

		const { key, secret } = await StreamClient();
		const client = new StreamChat(key, secret);

		// get the new agent
		const invitee = await Agent.findById(data.invitee).lean();
		const current = await Agent.findById(data.current).lean();

		// initialize the channel
		const channel = client.channel('messaging', data.chat);

		// add the new agent and remove the old agent
		await channel.addMembers([ invitee._id ]);
		await channel.removeMembers([ current._id ]);

		// update database with user exchange for agent trail (timestamp is automatically generated)
		const chat = await Chat.findByIdAndUpdate(data.chat, {
			$set: {
				refs: {
					agents: {
						assignee: invitee._id
					}
				}
			}
		});

		res.status(200).json(chat);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
