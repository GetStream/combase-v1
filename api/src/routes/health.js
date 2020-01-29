import { get } from '../controllers/v1/health';

import { wrapAsync } from '../utils/controllers';

module.exports = api => {
	api.route('/v1/health').get(wrapAsync(get));
};
