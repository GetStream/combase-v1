import User from 'models/user';
import Chat from 'models/chat';

exports.destroy = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };
		// const { serialized } = req;

		// if (serialized.role !== 'admin') {
		// 	return res.status(403).json({
		// 		status: 'Invalid permissions to view or modify this resource.'
		// 	});
		// }

		await User.findByIdAndRemove(data.user);

		// NOTE: Should the below not be refs.agents.assignee? and if
		// so, do we even want to delete all of a users chats if they
		// delete their account?

		// await Chat.remove({
		// 	'refs.organization': data.organization
		// });

		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
