import { StreamChat } from 'stream-chat';

import User from 'models/user';
import StreamClient from 'utils/stream';

exports.post = async (req, res) => {
	try {
		const data = req.body;

		const { _id, name } = await User.findOneOrCreate({ email: data.email }, data);

		const { key, secret } = await StreamClient();
		const client = new StreamChat(key, secret);

		await client.updateUser({
			id: _id.toString(),
			name,
			role: 'user'
		});

		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
