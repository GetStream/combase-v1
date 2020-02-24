import 'dotenv/config';
import shortid from 'shortid';
import nodemailer from 'nodemailer';
import postmark from 'nodemailer-postmark-transport';

import Agent from 'models/agent';

exports.reset = async (req, res) => {
	try {
		const { data } = req.body;

		if (!process.env.POSTMARK_KEY) {
			return res.status(400).json({
				error:
					'Missing POSTMARK_KEY environment variable. Please add this to your .env file or Heroku settings.'
			});
		}

		const transport = nodemailer.createTransport(
			postmark({
				auth: {
					apiKey: process.env.POSTMARK_KEY
				}
			})
		);

		const agent = await Agent.findById(data.agent);

		const password = shortid.generate();
		await Agent.findOneAndUpdate({ _id: agent._id }, { password });

		await transport.sendMail({
			from: agent.refs.organization.email.address,
			to: agent.email,
			subject: `Password Reset for ${invite.refs.organization.name} Customer Support Chat`,
			html: `
                <p>Hi ${agent.name.first},</p>
                <p>Your temporary password is: <strong>${password}</strong>. Please use this to temporary password to login to your account.</p>
                <p>If you have issues with your password reset or would like to reach out, shoot us an email at <a href="mailto="${agent
					.refs.organization.email.address}" target="_blank">${agent.refs.organization.email.address}</a>.</p>
				<p>
					Thank you,<br />
					Team ${invite.refs.organization.name}<br />
                    <a href="mailto=${invite.refs.organization.email.address}" target="_blank">
						${invite.refs.organization.email.address}
					</a>
				</p>
            `
		});

		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
