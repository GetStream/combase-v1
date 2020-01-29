import { LayoutProvider } from 'recyclerlistview/web';

export default class LayoutUtil {
    static getLayoutProvider(width = 375, height = 80) {
        return new LayoutProvider(
            index => {
                // TODO:
                // Differentiate between own message and partner message
                // for recycling
                return 'ChatMessage';
            },
            (type, dim) => {
                switch (type) {
                    case 'ChatMessage':
                        dim.height = height;
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
