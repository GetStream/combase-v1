import { get } from '../controllers/v1/config';

import { wrapAsync } from '../utils/controllers';

module.exports = api => {
	api.route('/v1/configs').get(wrapAsync(get));
};
