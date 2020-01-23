import Plugin from '../../../models/plugin';

exports.list = async (req, res) => {
	try {
		const data = req.query;
		const serialized = req.agent;

		if (!serialized.admin) {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.',
			});
		}

		const plugins = await Plugin.apiQuery(data);
		res.status(200).json(plugins);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
