import { get, post } from '../controllers/v1/transcript';

import { wrapAsync } from '../utils/controllers';

module.exports = (api) => {
	api.route('/v1/transcripts').get(wrapAsync(get));
	api.route('/v1/transcripts').post(wrapAsync(post));
};
