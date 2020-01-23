import WebhookFaqQueue from './queue';
import addedProcess from './added-process';
import removedProcess from './removed-process';
import updatedProcess from './updated-process';

WebhookFaqQueue.process('added', addedProcess);
WebhookFaqQueue.process('removed', removedProcess);
WebhookFaqQueue.process('updated', updatedProcess);

export default WebhookFaqQueue;
