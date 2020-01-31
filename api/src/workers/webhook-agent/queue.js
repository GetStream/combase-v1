import Queue from 'bull';
import { createClient } from 'workers/bull-redis';

const queue = new Queue('webhook-agent', {
	createClient,
	limiter: { max: 2000, duration: 60000 }, // limit to 2000 job per minute
});

// type: added || removed || updated
export const AddToWebhookAgentQueue = async (type, data = {}) => {
	return queue.add(type, data);
};

export default queue;
