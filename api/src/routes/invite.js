import { get } from '../controllers/v1/invite/get';
import { list } from '../controllers/v1/invite/list';
import { post } from '../controllers/v1/invite/post';
import { put } from '../controllers/v1/invite/update';
import { destroy } from '../controllers/v1/invite/destroy';

import { wrapAsync } from '../utils/controllers';

module.exports = (api) => {
	api.route('/v1/invites').get(wrapAsync(list));
	api.route('/v1/invites/:invite').get(wrapAsync(get));
	api.route('/v1/invites/:invite').put(wrapAsync(put));
	api.route('/v1/invites/:invite').post(wrapAsync(post));
	api.route('/v1/invites/:invite').delete(wrapAsync(destroy));
};
