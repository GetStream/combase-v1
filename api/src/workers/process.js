import webhook from './utils/webhook';

export default async (job) => {
	try {
		const { data } = job;

		await webhook({ data });
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
};
