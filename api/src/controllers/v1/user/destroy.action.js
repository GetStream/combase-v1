import User from 'models/user';
import Chat from 'models/chat';

exports.destroy = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };
		const serialized = req.serialized;

		if (serialized.role !== 'admin') {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.',
			});
		}

		await User.findByIdAndRemove(data.user).lean();
		await Chat.remove({ 'refs.organization': data.organization }).lean();

		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
