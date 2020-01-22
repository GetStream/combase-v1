import Chat from '../../../models/chat';

exports.get = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const chat = await Chat.findById(data.chat);
		res.status(200).json(chat);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
