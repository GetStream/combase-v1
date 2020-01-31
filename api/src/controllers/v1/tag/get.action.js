import Tag from 'models/tag';

exports.get = async (req, res) => {
	try {
		const data = req.params;

		const tag = await Tag.findById(data.tag).lean({ autopopulate: true });
		res.status(200).json(tag);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
