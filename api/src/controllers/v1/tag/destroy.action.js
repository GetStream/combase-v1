import Tag from 'models/tag';

exports.destroy = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		await Tag.findByIdAndRemove(data.tag).lean();

		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
