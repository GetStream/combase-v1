import { append } from 'shared/Chat';
import sortBy from 'lodash.sortby';

export default (state, { type, ...action }) => {
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
            return {
                ...state,
                partner: {
                    ...state.partner,
                    online: true,
                },
            };
        case 'user.watching.stop':
            return {
                ...state,
                partner: {
                    ...state.partner,
                    online: false,
                },
            };
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
        default:
            return state;
    }
};
