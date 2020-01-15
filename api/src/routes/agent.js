import { get } from '../controllers/v1/agent/get';
import { list } from '../controllers/v1/agent/list';
import { post } from '../controllers/v1/agent/post';
import { put } from '../controllers/v1/agent/update';
import { destroy } from '../controllers/v1/agent/destroy';

import { wrapAsync } from '../utils/controllers';

module.exports = (api) => {
	api.route('/v1/agents').get(wrapAsync(list));
	api.route('/v1/agents/:agent').get(wrapAsync(get));
	api.route('/v1/agents/:agent').put(wrapAsync(put));
	api.route('/v1/agents/:agent').post(wrapAsync(post));
	api.route('/v1/agents/:agent').delete(wrapAsync(destroy));
};
