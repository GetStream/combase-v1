import WebhookFaqQueue from './queue';
import addedProcess from './added-process';
import removedProcess from './removed-process';
import updatedProcess from './added-process';

WebhookFaqQueue.process('added', addedProcess);
WebhookFaqQueue.process('removed', removedProcess);
WebhookFaqQueue.process('updatedProcess', updatedProcess);

export default WebhookFaqQueue;
