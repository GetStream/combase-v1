import { login, post } from '../controllers/v1/auth';
import { reset } from '../controllers/v1/auth/password';

import { wrapAsync } from '../utils/controllers';

module.exports = api => {
	api.route('/v1/auth/login').get(wrapAsync(login));
	api.route('/v1/auth').post(wrapAsync(post));
	api.route('/v1/auth/password-reset').post(wrapAsync(reset));
};
