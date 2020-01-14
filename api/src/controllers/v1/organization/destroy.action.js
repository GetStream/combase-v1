import Organization from '../../../models/organization';
import Agent from '../../../models/agent';
import User from '../../../models/user';

exports.destroy = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };
		const serialized = req.agent;

		if (!serialized.admin) {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.',
			});
		}

		await Organization.findByIdAndRemove(data.organization);
		await Agent.remove({ organization: data.organization });
		await User.remove({ organization: data.organization });

		res.sendStatus(204);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
