import { login } from '../controllers/v1/auth/login';
import { post } from '../controllers/v1/invite/post';

import { wrapAsync } from '../utils/controllers';

module.exports = (api) => {
	api.route('/v1/auth/login').get(wrapAsync(login));
	api.route('/v1/auth').post(wrapAsync(post));
};
