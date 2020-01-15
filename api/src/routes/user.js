import { get } from '../controllers/v1/user/get';
import { list } from '../controllers/v1/user/list';
import { post } from '../controllers/v1/user/post';
import { put } from '../controllers/v1/user/update';
import { destroy } from '../controllers/v1/user/destroy';

import { wrapAsync } from '../utils/controllers';

module.exports = (api) => {
	api.route('/v1/users').get(wrapAsync(list));
	api.route('/v1/users/:user').get(wrapAsync(get));
	api.route('/v1/users/:user').put(wrapAsync(put));
	api.route('/v1/users/:user').post(wrapAsync(post));
	api.route('/v1/users/:user').delete(wrapAsync(destroy));
};
