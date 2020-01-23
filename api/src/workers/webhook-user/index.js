import WebhookUserQueue from './queue';
import addedProcess from './added-process';
import removedProcess from './removed-process';
import updatedProcess from './updated-process';

WebhookUserQueue.process('added', addedProcess);
WebhookUserQueue.process('removed', removedProcess);
WebhookUserQueue.process('updated', updatedProcess);

export default WebhookUserQueue;
