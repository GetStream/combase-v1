import Organization from 'models/organization';

exports.post = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const organization = await Organization.create(data).lean();
		res.status(200).json(organization);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
