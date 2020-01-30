import Tag from 'models/tag';

exports.update = async (req, res) => {
	try {
		const data = req.body;
		const params = req.params;

		const tag = await Tag.updateOne({ _id: params.tag }, { $set: data });
		res.status(200).json(tag);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
