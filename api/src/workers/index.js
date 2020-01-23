import 'dotenv/config';

import WebhookAgentQueue from './webhook-agent';
import WebhookChatQueue from './webhook-chat';
import WebhookFaqQueue from './webhook-faq';
import WebhookInviteQueue from './webhook-invite';
import WebhookOrganizationQueue from './webhook-organization';
import WebhookUserQueue from './webhook-user';

const queueArray = [
	WebhookAgentQueue,
	WebhookChatQueue,
	WebhookFaqQueue,
	WebhookInviteQueue,
	WebhookOrganizationQueue,
	WebhookUserQueue,
];
const TTL = 24 * 60 * 60 * 1000; // 1 day

const queueCompletedCleanup = async queue => queue.clean(TTL, 'completed');
const queueFailedCleanup = async queue => queue.clean(TTL, 'failed');
const logQueueStatus = queue => {
	queue.on('global:completed', (jobId, result) => {
		console.info(`Queue ${queue.name} job completed`, { jobId, result });
	});

	queue.on('error', function(err) {
		console.warn(`Queue ${queue.name} error`, { ErrMsg: err.message, err });
	});

	queue.on('stalled', function(job) {
		console.warn(`Queue ${queue.name} job stalled`, { job });
	});

	queue.on('failed', function(job, err) {
		console.warn(`Queue ${queue.name} failed`, {
			ErrMsg: err.message,
			job,
			err,
		});
	});

	queue.on('cleaned', function(jobs, status) {
		console.info(`Queue ${queue.name} cleaned jobs, status: ${status}`, {
			numbers: jobs.length,
		});
	});
};

async function start() {
	queueArray.forEach(queue => {
		logQueueStatus(queue);
		queueCompletedCleanup(queue);
		queueFailedCleanup(queue);
	});
}

start();

async function shutdown(signal) {
	logger.info(`Worker Received ${signal}. Shutting down.`);

	Promise.all(queueArray.map(queue => queue.close()))
		.then(() => process.exit(0))
		.catch(err => {
			logger.error(`Failure during worker shutdown: ${err.message}`);
			process.exit(1);
		});
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
