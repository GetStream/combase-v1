import { get, list, post, update, destroy } from '../controllers/v1/agent';

import { wrapAsync } from '../utils/controllers';

module.exports = api => {
	api.route('/v1/agents').get(wrapAsync(list));
	api.route('/v1/agents/:agent').get(wrapAsync(get));
	api.route('/v1/agents/:agent').put(wrapAsync(update));
	api.route('/v1/agents').post(wrapAsync(post));
	api.route('/v1/agents/:agent').delete(wrapAsync(destroy));
};
