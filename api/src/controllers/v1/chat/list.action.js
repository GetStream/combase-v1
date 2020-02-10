import 'dotenv/config';

import Chat from 'models/chat';

exports.list = async (req, res) => {
	try {
		const { serialized, query: data } = req;

		if (serialized.role !== 'admin') {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.',
			});
		}

		const chats = await Chat.apiQuery(data);
		res.status(200).json(chats);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
