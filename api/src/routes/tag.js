import { get, list, post, put, destroy } from '../controllers/v1/tag';

import { wrapAsync } from '../utils/controllers';

module.exports = (api) => {
	api.route('/v1/tags').get(wrapAsync(list));
	api.route('/v1/tags/:tag').get(wrapAsync(get));
	api.route('/v1/tags/:tag').put(wrapAsync(put));
	api.route('/v1/tags/:tag').post(wrapAsync(post));
	api.route('/v1/tags/:tag').delete(wrapAsync(destroy));
};
