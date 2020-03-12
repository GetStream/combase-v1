import Organization from 'models/organization';

exports.update = async (req, res) => {
	try {
		const data = req.body;
		const params = req.params;
		const { serialized } = req;

		// if (serialized.role !== 'admin') {
		// 	return res.status(403).json({
		// 		status: 'Invalid permissions to view or modify this resource.'
		// 	});
		// }

		const organization = await Organization.findOneAndUpdate({ _id: params.organization }, { $set: data }, { new: true });

		res.status(200).json(organization);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
