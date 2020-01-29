import { get, list, post, put, destroy } from '../controllers/v1/response';

import { wrapAsync } from '../utils/controllers';

module.exports = api => {
	api.route('/v1/responses').get(wrapAsync(list));
	api.route('/v1/responses/:response').get(wrapAsync(get));
	api.route('/v1/responses/:response').put(wrapAsync(put));
	api.route('/v1/responses/:response').post(wrapAsync(post));
	api.route('/v1/responses/:response').delete(wrapAsync(destroy));
};
