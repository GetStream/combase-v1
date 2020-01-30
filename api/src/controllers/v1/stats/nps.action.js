import Chat from 'models/chat';

exports.nps = async (req, res) => {
	try {
		const params = { ...req.params, ...req.query };

		if (params.segment === 'agent') {
			Chat.aggregate([
				{
					$group: {
						'refs.organization': '$organization',
						upvotes: {
							$sum: { $cond: ['$score.rating', 1, 0] },
						},
					},
				},
			]).exec();
		}

		// if (params.segment === 'organization') {
		// 	const chats = await Chat.find({ 'refs.organization': params.organization }).select('score.rating');
		// }

		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
