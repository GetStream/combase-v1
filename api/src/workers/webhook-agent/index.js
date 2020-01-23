import WebhookAgentQueue from './queue';
import addedProcess from './added-process';
import removedProcess from './removed-process';
import updatedProcess from './added-process';

WebhookAgentQueue.process('added', addedProcess);
WebhookAgentQueue.process('removed', removedProcess);
WebhookAgentQueue.process('updatedProcess', updatedProcess);

export default WebhookAgentQueue;
