import 'dotenv/config';
import nodemailer from 'nodemailer';
import postmark from 'nodemailer-postmark-transport';

import Invite from 'models/invite';

exports.post = async (req, res) => {
	try {
		const { url, ...data } = req.body;

		if (!process.env.APP_URL) {
			return res.status(400).json({
				error: 'Missing APP_URL environment variable. Please add this to your .env file or Heroku settings.'
			});
		}

		if (!process.env.POSTMARK_KEY) {
			return res.status(400).json({
				error:
					'Missing POSTMARK_KEY environment variable. Please add this to your .env file or Heroku settings.'
			});
		}

		const invite = await Invite.create(data);

		const transport = nodemailer.createTransport(
			postmark({
				auth: {
					apiKey: process.env.POSTMARK_KEY
				}
			})
		);

		await transport.sendMail({
			from: `${invite.refs.organization.name} <${invite.refs.organization.email.address}>`,
			to: data.email,
			subject: `You're Invited to ${invite.refs.organization.name} Customer Support Chat`,
			html: `
                <p>Hi ${data.name.first},</p>
                <p>You have been invited to the <a href="${process.env.APP_URL}" title="${invite.refs.organization
				.name}" target="">${invite.refs.organization
				.name} Customer Support Dashboard</a> powered by <a href="https://comba.se" title="Go to Comba.se" target="_blank">Combase</a>.</p>
				<p>To create an account, please <a href="${process.env.APP_URL}/auth/sign-up/${invite._id}">click here</a>.</p>
				<p>
					Thank you,<br />
					Team ${invite.refs.organization.name}<br />
                    <a href="mailto=${invite.refs.organization.email.address}" target="_blank">
						${invite.refs.organization.email.address}
					</a>
				</p>
            `
		});

		res.status(200).json(invite);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
