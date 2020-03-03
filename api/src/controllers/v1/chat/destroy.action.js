import Chat from 'models/chat';

exports.destroy = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };
		const { serialized } = req;

		if (serialized.role !== 'admin') {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.'
			});
		}

		// const chat = await Chat.updateOne(
		// 	{ _id: data.chat },
		// 	{ $push: { status: { type: 'Archived', timestamp: Date.now() } } }
		// );

		await Chat.findByIdAndRemove(data.chat);

		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
