import { get, list, post, put, destroy } from '../controllers/v1/webhook';

import { wrapAsync } from '../utils/controllers';

module.exports = api => {
	api.route('/v1/webhooks').get(wrapAsync(list));
	api.route('/v1/webhooks/:webhook').get(wrapAsync(get));
	api.route('/v1/webhooks/:webhook').put(wrapAsync(put));
	api.route('/v1/webhooks').post(wrapAsync(post));
	api.route('/v1/webhooks/:webhook').delete(wrapAsync(destroy));
};
