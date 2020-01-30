import Response from 'models/response';

exports.get = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const response = await Response.findById(data.response);
		res.status(200).json(response);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
