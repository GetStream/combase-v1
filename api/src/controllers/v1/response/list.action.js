import Response from 'models/response';

exports.list = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const responses = await Response.apiQuery(data);
		res.status(200).json(responses);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
