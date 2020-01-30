import { get, list, post, put, destroy } from '../controllers/v1/plugin';

import { wrapAsync } from '../utils/controllers';

module.exports = api => {
	api.route('/v1/plugins').get(wrapAsync(list));
	api.route('/v1/plugins/:plugin').get(wrapAsync(get));
	api.route('/v1/plugins/:plugin').put(wrapAsync(put));
	api.route('/v1/plugins').post(wrapAsync(post));
	api.route('/v1/plugins/:plugin').delete(wrapAsync(destroy));
};
