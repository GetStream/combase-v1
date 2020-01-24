import Chat from 'models/chat';

exports.nps = async (req, res) => {
	try {
		const params = { ...req.params, ...req.query };

		const chats = await Chat.find({
			'refs.organization': params.organization,
		}).lean();

		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
