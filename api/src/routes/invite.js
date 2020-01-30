import { get, list, post, put, destroy } from '../controllers/v1/invite';

import { wrapAsync } from '../utils/controllers';

module.exports = api => {
	api.route('/v1/invites').get(wrapAsync(list));
	api.route('/v1/invites/:invite').get(wrapAsync(get));
	api.route('/v1/invites/:invite').put(wrapAsync(put));
	api.route('/v1/invites').post(wrapAsync(post));
	api.route('/v1/invites/:invite').delete(wrapAsync(destroy));
};
