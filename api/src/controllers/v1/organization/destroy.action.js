import Organization from 'models/organization';
import Invite from 'models/invite';
import Agent from 'models/agent';
import User from 'models/user';
import Chat from 'models/chat';
import Faq from 'models/faq';

exports.destroy = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };
		const serialized = req.serialized;

		if (serialized.role !== 'admin') {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.',
			});
		}

		await Organization.findByIdAndRemove(data.organization).lean();

		await Invite.remove({ 'refs.organization': data.organization }).lean();
		await Agent.remove({ 'refs.organization': data.organization }).lean();
		await User.remove({ 'refs.organization': data.organization }).lean();
		await Chat.remove({ 'refs.organization': data.organization }).lean();
		await Faq.remove({ 'refs.organization': data.organization }).lean();

		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
