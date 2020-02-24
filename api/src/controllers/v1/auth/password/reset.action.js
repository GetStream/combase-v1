import 'dotenv/config';
import shortid from 'shortid';
import nodemailer from 'nodemailer';
import sendgrid from 'nodemailer-sendgrid-transport';

import Agent from 'models/agent';

exports.reset = async (req, res) => {
	try {
		const { data } = req.body;

		const transport = nodemailer.createTransport(
			sendgrid({
				auth: {
					api_key: process.env.MAILGUN_API_KEY,
					domain: process.env.MAILGUN_DOMAIN
				}
			})
		);

		const agent = await Agent.findById(data.agent);

		const password = shortid.generate();
		await Agent.findOneAndUpdate({ _id: agent._id }, { password });

		await transport.sendMail({
			from: agent.refs.organization.email.address,
			to: agent.email,
			subject: `${agent.refs.organization.name} – Password Reset`,
			html: `
                <p>Hi ${agent.name.first},</p>
                <p>Your temporary password is: <strong>${password}</strong>. Please use this to temporary password to login to your account.</p>
                <p>If you have issues with your password reset or would like to reach out, shoot us an email at <a href="mailto="${agent
					.refs.organization.email.address}" target="_blank">${agent.refs.organization.email.address}</a>.</p>
                <p>Team ${agent.refs.organization.name}<br />
                    <a href="mailto=${agent.refs.organization.email.address}" target="_blank">
                        ${agent.refs.organization.email.address}
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
