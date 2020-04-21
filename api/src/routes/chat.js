import { create, get, list, post, put, destroy } from '../controllers/v1/chat';

import { wrapAsync } from '../utils/controllers';

module.exports = api => {
	api.route('/v1/chats').get(wrapAsync(list));
	api.route('/v1/chats/:chat').get(wrapAsync(get));
	api.route('/v1/chats/:chat').put(wrapAsync(put));
	api.route('/v1/chats').post(wrapAsync(post));
	api.route('/v1/chats/:agent').post(wrapAsync(create));
	api.route('/v1/chats/:chat').delete(wrapAsync(destroy));
};
