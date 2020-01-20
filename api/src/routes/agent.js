import { get, list, post, put, destroy } from '../controllers/v1/agent';

import { wrapAsync } from '../utils/controllers';

module.exports = (api) => {
	api.route('/v1/agents').get(wrapAsync(list));
	api.route('/v1/agents/:agent').get(wrapAsync(get));
	api.route('/v1/agents/:agent').put(wrapAsync(put));
	api.route('/v1/agents/:agent').post(wrapAsync(post));
	api.route('/v1/agents/:agent').delete(wrapAsync(destroy));
};
