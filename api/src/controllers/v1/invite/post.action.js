import Invite from 'models/invite';
import { AddToWebhookInviteQueue } from 'workers/webhook-invite/queue';

exports.post = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const invite = await Invite.create(data);

		await AddToWebhookInviteQueue('added', invite);

		res.status(200).json(invite);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
