import Redis from 'ioredis';

const client = new Redis(process.env.REDIS_URL);
const subscriber = new Redis(process.env.REDIS_URL);

const createClient = type => {
	switch (type) {
		case 'client':
			return client;
		case 'subscriber':
			return subscriber;
		default:
			return new Redis(process.env.REDIS_URL);
	}
};

export { createClient };
