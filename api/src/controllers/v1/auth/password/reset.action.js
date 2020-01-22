import dotenv from 'dotenv';
import shortid from 'shortid';
import nodemailer from 'nodemailer';
import mailgun from 'nodemailer-mailgun-transport';

import Agent from '../../../../models/agent';

dotenv.config();

exports.reset = async (req, res) => {
	try {
		const data = req.body;

		const transport = nodemailer.createTransport(
			mailgun({
				auth: {
					api_key: process.env.MAILGUN_API_KEY,
					domain: process.env.MAILGUN_DOMAIN,
				},
			})
		);

		const agent = await Agent.findById(data.agent);
		const organization = await Organization.findById(
			agent.refs.organization
		);

		const password = shortid.generate();

		await Agent.findOneAndUpdate({ _id: agent._id }, { password });

		await transport.sendMail({
			from: organization.email,
			to: agent.email,
			subject: `${organization.name} – Password Reset`,
			html: `
                <p>Hi ${agent.name.first},</p>
                <p>Your temporary password is: <strong>${password}</strong>. Please use this to temporary password to login to your account.</p>
                <p>If you have issues with your password reset or would like to reach out, shoot us an email at <a href="mailto="${organization.email}" target="_blank">${organization.email}</a>.</p>
                <p>Team ${organization.name}<br />
                    <a href="mailto=${organization.email}" target="_blank">
                        ${organization.email}
                    </a>
                </p>
            `,
		});

		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
