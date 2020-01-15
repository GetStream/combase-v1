import { get } from '../controllers/v1/organization/get';
import { list } from '../controllers/v1/organization/list';
import { post } from '../controllers/v1/organization/post';
import { put } from '../controllers/v1/organization/update';
import { destroy } from '../controllers/v1/organization/destroy';

import { wrapAsync } from '../utils/controllers';

module.exports = (api) => {
	api.route('/v1/organizations').get(wrapAsync(list));
	api.route('/v1/organizations/:organization').get(wrapAsync(get));
	api.route('/v1/organizations/:organization').put(wrapAsync(put));
	api.route('/v1/organizations/:organization').post(wrapAsync(post));
	api.route('/v1/organizations/:organization').delete(wrapAsync(destroy));
};
