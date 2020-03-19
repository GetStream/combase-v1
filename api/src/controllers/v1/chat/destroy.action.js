// import Chat from 'models/chat';

// exports.destroy = async (req, res) => {
// 	try {
// 		const data = { ...req.body, ...req.params };
// 		const { serialized } = req;

// 		if (serialized.role !== 'admin') {
// 			return res.status(403).json({
// 				status: 'Invalid permissions to view or modify this resource.'
// 			});
// 		}

// 		await Chat.updateOne({ _id: data.chat }, { $push: { status: { type: 'Archived', timestamp: Date.now() } } });

// 		res.sendStatus(204);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ error: error.message });
// 	}
// };


//
//
// Permanently Delete the Chat data from Mongo AND Stream Chat
// 
//

import Chat from 'models/chat';
import StreamClient from 'utils/stream';

exports.destroy = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };
		const { serialized } = req;

		// if (serialized.role !== 'admin') {
		// 	return res.status(403).json({
		// 		status: 'Invalid permissions to view or modify this resource.'
		// 	});
		// }
		console.log('chat', data.chat)
		const { client } = await StreamClient();
		await Chat.findByIdAndRemove(data.chat);
		const channel = client.channel('commerce', data.chat);
		await channel.delete();
		// await Chat.updateOne({ _id: data.chat }, { $push: { status: { type: 'Archived', timestamp: Date.now() } } });

		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

