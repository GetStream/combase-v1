import Response from 'models/response';

exports.destroy = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const response = await Response.updateOne(
			{ _id: data.faq },
			{ $set: data }
		);
		res.status(200).json(response);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
