import 'dotenv/config';
import DataURI from 'datauri';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

exports.post = async (req, res) => {
	try {
		let cloudinaryKey;
		let cloudinarySecret;

		// if this env is found, it's assumed that the api is running on heroku
		if (process.env.CLOUDINARY_URL) {
			// extract the key and secret from the environment variable
			[
				cloudinaryKey,
				cloudinarySecret,
			] = process.env.CLOUDINARY_URL.substr(13)
				.split('@')[0]
				.split(':');
		} else {
			// api key and secret were provided from a .env file
			cloudinaryKey = process.env.CLOUDINARY_API_KEY;
			cloudinarySecret = process.env.CLOUDINARY_API_SECRET;
		}

		const datauri = new DataURI();
		const file = datauri.format(
			path.extname(req.file.originalname).toString(),
			req.file.buffer
		);

		cloudinary.uploader.upload(file.content, (error, data) => {
			if (error) {
				console.error(error);
				return res.sendStatus(500);
			}

			res.status(200).json({
				dimensions: {
					height: data.height,
					width: data.width,
				},
				format: data.format,
				url: data.url,
			});
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
