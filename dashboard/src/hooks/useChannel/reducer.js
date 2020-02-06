import { append } from 'shared/Chat';
import sortBy from 'lodash.sortby';

export default (state, { type, ...action }) => {
    // console.log('channel event', type, action);
    switch (type) {
        case 'INIT_STATE':
            return {
                ...state,
                ...action,
                messages: sortBy(
                    action.messages,
                    ({ created_at }) => -created_at
                ),
                loading: false,
            };
        case 'ERROR':
            return {
                ...state,
                error: action.error,
            };

        case 'message.new':
            return {
                ...state,
                messages: sortBy(
                    append(state.messages, [action.message]),
                    ({ created_at }) => -created_at
                ),
            };
        case 'user.watching.start':
            if (action.user.id === state.partner.id) {
                return {
                    ...state,
                    partner: {
                        ...state.partner,
                        last_active: action.user.last_active,
                        online: true,
                    },
                };
            }
            return state;
        case 'user.watching.stop':
            if (action.user.id === state.partner.id) {
                return {
                    ...state,
                    partner: {
                        ...state.partner,
                        last_active: action.user.last_active,
                        online: false,
                    },
                };
            }
            return state;

        case 'typing.start':
            return {
                ...state,
                typing: { ...state.typing, [action.user.id]: true },
            };
        case 'typing.stop':
            return {
                ...state,
                typing: { ...state.typing, [action.user.id]: false },
            };

        case 'message.read':
            if (action.user.id === state.partner.id) {
                return {
                    ...state,
                    read: {
                        ...state.read,
                        last_read: action.received_at,
                    },
                };
            }
            return state;

        case 'loadMore.request':
            return {
                ...state,
                loadingMore: true,
            };

        case 'loadMore.success':
            return {
                ...state,
                loadingMore: false,
                noMoreMessages: action.messages < state.limit,
                messages: sortBy(
                    append(state.messages, action.messages),
                    ({ created_at }) => -created_at
                ),
            };

        case 'loadMore.error':
            return {
                ...state,
                error: action.error,
                loadingMore: false,
            };
        default:
            return state;
    }
};
