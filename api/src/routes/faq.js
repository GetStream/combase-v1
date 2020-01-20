import { get, list, post, put, destroy } from '../controllers/v1/faq';

import { wrapAsync } from '../utils/controllers';

module.exports = api => {
	api.route('/v1/faqs').get(wrapAsync(list));
	api.route('/v1/faqs/:faq').get(wrapAsync(get));
	api.route('/v1/faqs/:faq').put(wrapAsync(put));
	api.route('/v1/faqs/:faq').post(wrapAsync(post));
	api.route('/v1/faqs/:faq').delete(wrapAsync(destroy));
};
