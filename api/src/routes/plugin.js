import { get, list, post, update, destroy } from '../controllers/v1/plugin';
import { blazeVerifyExecVerify, clearbitExecEnrich } from '../controllers/v1/plugin/integration';

import { wrapAsync } from '../utils/controllers';

module.exports = (api) => {
	api.route('/v1/plugins').get(wrapAsync(list));
	api.route('/v1/plugins/:plugin').get(wrapAsync(get));
	api.route('/v1/plugins/:plugin').put(wrapAsync(update));
	api.route('/v1/plugins').post(wrapAsync(post));
	api.route('/v1/plugins/:plugin').delete(wrapAsync(destroy));

	// integrations
	api.route('/v1/plugins/blaze_verify/verify').post(wrapAsync(blazeVerifyExecVerify));
	api.route('/v1/plugins/clearbit/enrich').post(wrapAsync(clearbitExecEnrich));
};
