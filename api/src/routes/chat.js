import { get, list, post, put, destroy } from '../controllers/v1/chat';

import { wrapAsync } from '../utils/controllers';

module.exports = (api) => {
	api.route('/v1/chats').get(wrapAsync(list));
	api.route('/v1/chats/:chat').get(wrapAsync(get));
	api.route('/v1/chats/:chat').put(wrapAsync(put));
	api.route('/v1/chats/:chat').post(wrapAsync(post));
	api.route('/v1/chats/:chat').delete(wrapAsync(destroy));
};
