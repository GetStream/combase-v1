import WebhookUserQueue from './queue';
import addedProcess from './added-process';
import removedProcess from './removed-process';
import updatedProcess from './added-process';

WebhookUserQueue.process('added', addedProcess);
WebhookUserQueue.process('removed', removedProcess);
WebhookUserQueue.process('updatedProcess', updatedProcess);

export default WebhookUserQueue;
