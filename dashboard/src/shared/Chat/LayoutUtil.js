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

        const hasAttachments = !!currentMessage.attachments;

        const isOwn = user.id === currentMessage.user.id;
        const hasDate = !isSameSection(currentMessage, previousMessage);

        if (isOwn) {
          if (hasAttachments) {
            return !hasDate ? "UserMessageWithAttachments" : "UserMessageWithAttachmentAndDate";
          }
          return !hasDate ? "UserMessage" : "UserMessageWithDate";
        }

        if (hasAttachments) {
          return !hasDate ? "PartnerMessageWithAttachments" : "PartnerMessageWithAttachmentAndDate";
        }

        return !hasDate ? "PartnerMessage" : "PartnerMessageWithDate";
      },
      (type, dim) => {
        switch (type) {
          case "SystemMessage":
            dim.height = 72;
            dim.width = width;
            break;
          case "UserMessageWithAttachmentAndDate":
          case "PartnerMessageWithAttachmentAndDate":
            dim.height = 544;
            dim.width = width || 375;
            break;
          case "UserMessageWithAttachment":
          case "PartnerMessageWithAttachment":
            dim.height = 496;
            dim.width = width || 375;
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
