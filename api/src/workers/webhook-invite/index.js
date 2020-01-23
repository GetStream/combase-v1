import WebhookInviteQueue from './queue';
import addedProcess from './added-process';
import removedProcess from './removed-process';
import updatedProcess from './added-process';

WebhookInviteQueue.process('added', addedProcess);
WebhookInviteQueue.process('removed', removedProcess);
WebhookInviteQueue.process('updated', updatedProcess);

export default WebhookInviteQueue;
