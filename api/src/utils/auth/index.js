import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Agent from '../../models/agent';

dotenv.config();

const auth = async (req, res, next) => {
	const allowed = [
		{
			path: '/v1/auth/token/generate',
			method: ['POST'],
		},
		{
			path: '/v1/auth/token/debug',
			method: ['POST'],
		},
		{
			path: '/v1/auth/password/forgot',
			method: ['POST'],
		},
		{
			path: '/v1/auth/password/reset',
			method: ['POST'],
		},
		{
			path: '/v1/agents',
			method: ['POST'],
		},
	];

	const match = allowed.map(route => {
		if (route.path === req.path && route.method.includes(req.method)) {
			return true;
		}
	});

	if (match.includes(true)) return next();

	const auth = req.headers.authorization;

	if (!auth || !auth.length) {
		return res.status(401).json({
			error: 'Missing or incorrect auth credentials.',
		});
	}

	try {
		const token = req.headers.authorization.replace(/^Bearer\s/, '');

		if (token) {
			const { sub } = jwt.verify(token, process.env.SIGNING_SECRET);

			// eslint-disable-next-line require-atomic-updates
			req.agent = await Agent.findById(
				mongoose.Types.ObjectId(sub)
			).lean();

			if (!req.agent._id) {
				return res.status(401).json({
					error: 'Unauthorized auth credentials.',
				});
			}

			return next();
		}
	} catch (error) {
		res.status(401).json({
			error: 'Missing or incorrect auth credentials.',
		});

		next();
	}
};

module.exports = auth;
