import multer from 'multer';

import { post } from '../controllers/v1/upload';

import { wrapAsync } from '../utils/controllers';

const upload = multer();

module.exports = api => {
	api.route('/v1/uploads').post(upload.single('file'), post);
};
