import { get, list, post, update, destroy } from '../controllers/v1/user';

import { wrapAsync } from '../utils/controllers';

module.exports = api => {
	api.route('/v1/users').get(wrapAsync(list));
	api.route('/v1/users/:user').get(wrapAsync(get));
	api.route('/v1/users/:user').put(wrapAsync(update));
	api.route('/v1/users').post(wrapAsync(post));
	api.route('/v1/users/:user').delete(wrapAsync(destroy));
};
