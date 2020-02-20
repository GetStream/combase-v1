import { LayoutProvider } from "recyclerlistview/web";
import { isSameSection } from "./utils";

export default class LayoutUtil {
  static getLayoutProvider(width = 375, data, user) {
    return new LayoutProvider(
      index => {
        const currentMessage = data[index];
        const previousMessage = data[index + 1];

        if (currentMessage.system) {
          return "SystemMessage";
        }

        const isOwn = user.id === currentMessage.user.id;
        const hasDate = !isSameSection(currentMessage, previousMessage);
        if (isOwn) {
          return !hasDate ? "UserMessage" : "UserMessageWithDate";
        }

        return !hasDate ? "PartnerMessage" : "PartnerMessageWithDate";
      },
      (type, dim) => {
        switch (type) {
          case "SystemMessage":
            dim.height = 72;
            dim.width = width;
            break;
          case "UserMessageWithDate":
          case "PartnerMessageWithDate":
            dim.height = 248;
            dim.width = width || 375;
            break;
          case "UserMessage":
          case "PartnerMessage":
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
