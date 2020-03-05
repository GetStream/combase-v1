exports.get = async (req, res) => {
	try {
		const data = req.query;

		const transcript = {
			foo: 'bar'
		};

		res.status(200).json(transcript);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
