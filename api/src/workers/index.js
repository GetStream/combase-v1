import dotenv from 'dotenv';
import Bull from 'bull';

import process from './process';

dotenv.config();

const queue = new Bull('queue', process.env.REDIS_URL);

queue.process(process);

async function shutdown(signal) {
	try {
		console.info(`Worker Received ${signal}. Shutting down.`);
		await queue.close();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
