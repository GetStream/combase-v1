import { LayoutProvider } from 'recyclerlistview/web';

export default class LayoutUtil {
    static getLayoutProvider(width = 375, data, user) {
        return new LayoutProvider(
            index => {
                const currentMessage = data[index];

                if (currentMessage.system) {
                    return 'SystemMessage';
                }

                const isOwn = user.id === currentMessage.user.id;

                if (isOwn) {
                    return 'UserMessage';
                }

                return 'PartnerMessage';
            },
            (type, dim) => {
                switch (type) {
                    case 'SystemMessage':
                        dim.height = 72;
                        dim.width = width;
                        break;
                    case 'UserMessage':
                    case 'PartnerMessage':
                        dim.height = 200;
                        dim.width = width || 375;
                        break;
                    default:
                        dim.height = 0;
                        dim.width = 0;
                }
            }
        );
    }
}
