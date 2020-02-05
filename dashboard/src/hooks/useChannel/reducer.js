import { append } from 'shared/Chat';
import sortBy from 'lodash.sortby';

export default (state, { type, ...action }) => {
    // console.log('channel event', action);
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
        default:
            return state;
    }
};
