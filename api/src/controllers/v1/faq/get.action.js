import Faq from 'models/faq';

exports.get = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const faq = await Faq.findById(data.faq);
		res.status(200).json(faq);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
