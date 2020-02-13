import Invite from 'models/invite';
import { AddToWebhookInviteQueue } from 'workers/webhook-invite/queue';

exports.update = async (req, res) => {
	try {
		const data = req.body;
		const params = req.params;

		const invite = await Invite.updateOne(
			{ _id: params.invite },
			{ $set: data }
		);
		console.log(invite);
		await AddToWebhookInviteQueue('updated', invite);

		res.status(200).json(invite);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
