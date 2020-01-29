import Response from 'models/response';

exports.update = async (req, res) => {
	try {
		const data = req.body;
		const params = req.params;

		const response = await Response.updateOne(
			{ _id: params.response },
			{ $set: data }
		).lean();

		res.status(200).json(response);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
