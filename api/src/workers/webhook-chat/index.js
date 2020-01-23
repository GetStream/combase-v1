import WebhookChatQueue from './queue';
import addedProcess from './added-process';
import removedProcess from './removed-process';
import updatedProcess from './updated-process';

WebhookChatQueue.process('added', addedProcess);
WebhookChatQueue.process('removed', removedProcess);
WebhookChatQueue.process('updated', updatedProcess);

export default WebhookChatQueue;
