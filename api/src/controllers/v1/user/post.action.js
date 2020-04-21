import { StreamChat } from 'stream-chat';

import User from 'models/user';
import StreamClient from 'utils/stream';

exports.post = async (req, res) => {
	try {
		const data = req.body;

		const { isNew, _doc: user } = await User.findOneOrCreate({ "email.address": data.email.address }, data);

		const { key, secret } = StreamClient();
		const client = new StreamChat(key, secret);

		await client.setUser({
			id: user._id.toString(),
			name: user.name,
			role: 'user'
		});

		const streamToken = client.createToken(user._id.toString())

		res.status(200).json({ ...user, isNew, tokens: { stream: streamToken } });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
