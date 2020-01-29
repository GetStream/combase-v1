import Tag from 'models/tag';

exports.list = async (req, res) => {
	try {
		const data = req.query;

		const tags = await Tag.apiQuery(data);
		res.status(200).json(tags);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
