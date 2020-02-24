import Organization from 'models/organization';

exports.destroy = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };
		const { serialized } = req;

		if (serialized.role !== 'admin') {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.'
			});
		}

		await Organization.findByIdAndRemove(data.organization);

		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
