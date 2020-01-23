import WebhookAgentQueue from './queue';
import addedProcess from './added-process';
import removedProcess from './removed-process';
import updatedProcess from './updated-process';

WebhookAgentQueue.process('added', addedProcess);
WebhookAgentQueue.process('removed', removedProcess);
WebhookAgentQueue.process('updated', updatedProcess);

export default WebhookAgentQueue;
