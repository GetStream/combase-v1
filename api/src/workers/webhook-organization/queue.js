import Queue from 'bull';

const WebhookAgentQueue = new Queue('webhook-agent', process.env.REDIS_URL, {
	limiter: { max: 1000, duration: 60000 }, // Limit to 1000 job per minute
});

// type: added || removed || updated
export const AddToWebhookAgentQueue = async (type, data = {}) => {
	return WebhookAgentQueue.add(type, data);
};

export default WebhookAgentQueue;
