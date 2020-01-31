import 'dotenv/config';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import Agent from 'models/agent';
import whitelist from './whitelist';

const auth = async (req, res, next) => {
	try {
		// extract headers
		const auth = req.headers.authorization;

		// ensure that header exists
		if (!auth || !auth.length) {
			return res.status(401).json({
				error: 'Missing or incorrect auth credentials.',
			});
		}

		// strip bearer from token
		const token = req.headers.authorization.replace(/^Bearer\s/, '');

		// see whitelist.js
		whitelist.forEach(w => {
			if (req.path.includes(w.path) && req.method === w.method) {
				if (w.auth && token !== process.env.AUTH_SECRET) {
					return res.status(403).json({
						error: 'Missing or incorrect auth credentials.',
					});
				}

				return next();
			}
		});

		// if a jwt token exists
		if (token) {
			const { sub } = jwt.verify(token, process.env.AUTH_SECRET);

			// eslint-disable-next-line require-atomic-updates
			req.serialized = await Agent.findById(
				mongoose.Types.ObjectId(sub)
			).lean();

			if (!req.serialized._id) {
				return res.status(401).json({
					error: 'Unauthorized auth credentials.',
				});
			}

			return next();
		}
	} catch (error) {
		console.error(error);

		return res.status(401).json({
			error: 'Missing or incorrect auth credentials.',
		});
	}
};

module.exports = auth;
