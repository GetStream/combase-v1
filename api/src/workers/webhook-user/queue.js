import Queue from 'bull';

const queue = new Queue('webhook-user', process.env.REDIS_URL, {
	limiter: { max: 1000, duration: 60000 }, // Limit to 1000 job per minute
});

// type: added || removed || updated
export const AddToWebhookUserQueue = async (type, data = {}) => {
	return queue.add(type, data);
};

export default queue;
