import WebhookOrganizationQueue from './queue';
import addedProcess from './added-process';
import removedProcess from './removed-process';
import updatedProcess from './added-process';

WebhookOrganizationQueue.process('added', addedProcess);
WebhookOrganizationQueue.process('removed', removedProcess);
WebhookOrganizationQueue.process('updatedProcess', updatedProcess);

export default WebhookOrganizationQueue;
