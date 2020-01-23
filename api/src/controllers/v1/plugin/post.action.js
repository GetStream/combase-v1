import Plugin from '../../../models/plugin';

exports.post = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };
		const serialized = req.serialized;

		if (serialized.role !== 'admin') {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.',
			});
		}

		const plugin = await Plugin.create(data).lean();
		res.status(200).json(plugin);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
