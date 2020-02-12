import 'dotenv/config';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import find from 'lodash.find';

import Agent from 'models/agent';
import whitelist from './whitelist';

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

const auth = async (req, res, next) => {
	try {
		if (req.path.includes('health')) {
			next();
		}

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

		const routeConfig = find(
			whitelist,
			({ method, path }) =>
				(req.path.includes(path) && req.method === method) ||
				method === 'all'
		);
		if (routeConfig) {
			if (routeConfig.auth && token === process.env.AUTH_SECRET) {
				return next();
			} else if (!routeConfig.auth) {
				return next();
			}
		}

		// if a jwt token exists
		if (token) {
			const { sub } = jwt.verify(token, process.env.AUTH_SECRET);

			// eslint-disable-next-line require-atomic-updates
			req.serialized = await Agent.findById(mongoose.Types.ObjectId(sub))
				.select('-password')
				.lean({
					autopopulate: false,
				});

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
