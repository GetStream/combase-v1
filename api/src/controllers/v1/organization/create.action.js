import Organization from '../../../models/organization';

exports.create = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const organization = await Organization.create(data);
		res.status(200).json(organization);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
