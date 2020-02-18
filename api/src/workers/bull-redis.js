import Redis from 'ioredis';

const client = new Redis(process.env.REDIS_URL);
const subscriber = new Redis(process.env.REDIS_URL);
const defaults = [];

const closeRedisConnections = () => {
	client.disconnect();
	subscriber.disconnect();
	defaults.forEach((c) => c.disconnect());
};

const createClient = (type) => {
	if (type === 'client') return client;
	if (type === 'subscriber') return subscriber;

	const connection = new Redis(process.env.REDIS_URL);
	defaults.push(connection);
	return connection;
};

export { createClient, closeRedisConnections };
