import WebhookChatQueue from './queue';
import addedProcess from './added-process';
import removedProcess from './removed-process';
import updatedProcess from './added-process';

WebhookChatQueue.process('added', addedProcess);
WebhookChatQueue.process('removed', removedProcess);
WebhookChatQueue.process('updatedProcess', updatedProcess);

export default WebhookChatQueue;
