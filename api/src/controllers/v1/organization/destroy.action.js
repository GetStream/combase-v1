import Organization from 'models/organization';
import Invite from 'models/invite';
import Agent from 'models/agent';
import User from 'models/user';
import Chat from 'models/chat';
import Faq from 'models/faq';

import { AddToWebhookOrganizationQueue } from 'workers/webhook-organization/queue';
import { AddToWebhookInviteQueue } from 'workers/webhook-invite/queue';
import { AddToWebhookAgentQueue } from 'workers/webhook-agent/queue';
import { AddToWebhookUserQueue } from 'workers/webhook-user/queue';
import { AddToWebhookChatQueue } from 'workers/webhook-chat/queue';
import { AddToWebhookFaqQueue } from 'workers/webhook-faq/queue';

exports.destroy = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };
		const serialized = req.serialized;

		if (serialized.role !== 'admin') {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.',
			});
		}

		const invite = await Invite.remove({
			'refs.organization': data.organization,
		}).lean();
		await AddToWebhookInviteQueue('removed', invite);

		const agent = await Agent.remove({
			'refs.organization': data.organization,
		}).lean();
		await AddToWebhookAgentQueue('removed', agent);

		const user = await User.remove({
			'refs.organization': data.organization,
		}).lean();
		await AddToWebhookUserQueue('removed', user);

		const chat = await Chat.remove({
			'refs.organization': data.organization,
		}).lean();
		await AddToWebhookChatQueue('removed', chat);

		const faq = await Faq.remove({
			'refs.organization': data.organization,
		}).lean();
		await AddToWebhookFaqQueue('removed', faq);

		const organization = await Organization.findByIdAndRemove(
			data.organization
		).lean();
		await AddToWebhookOrganizationQueue('removed', organization);

		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
