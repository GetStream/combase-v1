exports.list = async (req, res) => {
	try {
		res.status(200).json([
			'agent:added',
			'agent:updated',
			'agent:removed',
			'chat:added',
			'chat:updated',
			'chat:removed',
			'faq:added',
			'faq:updated',
			'faq:removed',
			'invite:added',
			'invite:updated',
			'invite:removed',
			'organization:added',
			'organization:updated',
			'organization:removed',
			'user:added',
			'user:updated',
			'user:removed',
		]);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
