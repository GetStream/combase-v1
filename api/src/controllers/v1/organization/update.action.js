import Organization from '../../../models/organization';

exports.update = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const organization = await Organization.updateOne({ _id: data.organization }, { $set: data });
		res.status(200).json(organization);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
