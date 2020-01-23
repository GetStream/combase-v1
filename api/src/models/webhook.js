import mongoose, { Schema } from 'mongoose';
import query from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';

export const WebhookSchema = new Schema(
	{
		url: {
			type: String,
			trim: true,
		},
		events: [
			{
				event: {
					type: String,
					enum: [
						'agent:added',
						'agent:updated',
						'agent:removed',
						'chat:added',
						'chat:updated',
						'chat:removed',
						'faq:added',
						'faq:updated',
						'faq:removed',
						'invite:added',
						'invite:updated',
						'invite:removed',
						'organization:added',
						'organization:updated',
						'organization:removed',
						'user:added',
						'user:updated',
						'user:removed',
					],
				},
			},
		],
		refs: {
			organization: {
				type: Schema.Types.ObjectId,
				ref: 'Organization',
				required: true,
				autopopulate: true,
			},
		},
	},
	{
		collection: 'webhooks',
	}
);

WebhookSchema.plugin(timestamps);
WebhookSchema.plugin(query);

WebhookSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Webhook', WebhookSchema);
