import Faq from 'models/faq';

exports.post = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const faq = await Faq.create(data).lean();
		res.status(200).json(faq);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
