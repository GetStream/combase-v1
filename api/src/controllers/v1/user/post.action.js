import { StreamChat } from 'stream-chat';

import User from 'models/user';
import StreamClient from 'utils/stream';

exports.post = async (req, res) => {
	try {
		const data = req.body;

		const user = await User.findOneOrCreate({ "email.address": data.email.address }, data);

		const { key, secret } = StreamClient();
		const client = new StreamChat(key, secret);

		const streamUser = await client.setUser({
			id: user._id.toString(),
			name: user.name,
			role: 'user'
		});

		console.log('stream user', streamUser);

		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
