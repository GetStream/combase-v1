import dotenv from 'dotenv';

import Faq from '../../../models/faq';

dotenv.config();

exports.list = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const faqs = await Faq.apiQuery(data);
		res.status(200).json(faqs);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
