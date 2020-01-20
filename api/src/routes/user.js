import { get, list, post, put, destroy } from '../controllers/v1/user';

import { wrapAsync } from '../utils/controllers';

module.exports = (api) => {
	api.route('/v1/users').get(wrapAsync(list));
	api.route('/v1/users/:user').get(wrapAsync(get));
	api.route('/v1/users/:user').put(wrapAsync(put));
	api.route('/v1/users/:user').post(wrapAsync(post));
	api.route('/v1/users/:user').delete(wrapAsync(destroy));
};
