import nodemailer from 'nodemailer';
import mailgun from 'nodemailer-mailgun-transport';

import Invite from 'models/invite';
import { AddToWebhookInviteQueue } from 'workers/webhook-invite/queue';

exports.post = async (req, res) => {
	try {
		const data = req.body;

		const invite = await Invite.create(data);

		const transport = nodemailer.createTransport(
			mailgun({
				auth: {
					api_key: process.env.MAILGUN_API_KEY,
					domain: process.env.MAILGUN_DOMAIN,
				},
			})
		);

		await transport.sendMail({
			from: invite.refs.organization.email.address,
			to: agent.email,
			subject: `${invite.refs.organization.name} – Agent Invite`,
			html: `
                <p>Hi ${agent.name.first},</p>
                <p>You have been invited to ${organization.name}. Please create your account here.</p>
                <p>Team ${organization.name}<br />
                    <a href="mailto=${invite.refs.organization.email.address}" target="_blank">
                        ${invite.refs.organization.email.address}
                    </a>
                </p>
            `,
		});

		await AddToWebhookInviteQueue('added', invite);

		res.status(200).json(invite);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
