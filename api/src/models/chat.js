import mongoose, { Schema } from 'mongoose';
import query from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';
import autopopulate from 'mongoose-autopopulate';

export const ChatSchema = new Schema(
	{
		meta: {
			subject: {
				type: String,
				trim: true,
				required: true,
			},
		},
		score: {
			rating: {
				type: Boolean,
				default: true,
			},
			comment: {
				type: String,
				trim: true,
				default: '',
			},
		},
		notes: [
			{
				note: {
					type: String,
					trim: true,
				},
				agent: {
					type: Schema.Types.ObjectId,
					ref: 'Agent',
					required: true,
					autopopulate: {
						select: ['name', 'email'],
					},
				},
			},
		],
		refs: {
			user: {
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true,
				autopopulate: true,
			},
			tags: {
				type: Schema.Types.ObjectId,
				ref: 'Tag',
				autopopulate: true,
			},
			agents: {
				assignee: {
					agent: {
						type: Schema.Types.ObjectId,
						ref: 'Agent',
						required: false,
						autopopulate: {
							select: ['name', 'email'],
						},
					},
					timestamp: {
						type: Date,
						default: new Date(),
					},
				},
			},
			organization: {
				type: Schema.Types.ObjectId,
				ref: 'Organization',
				required: true,
				autopopulate: true,
			},
		},
		status: [
			{
				type: {
					type: String,
					enum: [
						'Open',
						'Pending User',
						'Pending Agent',
						'Waiting',
						'Closed',
						'Archived',
					],
					default: 'Waiting',
				},
				timestamp: {
					type: Date,
					default: Date.now(),
				},
			},
		],
	},
	{
		collection: 'chats',
	}
);

ChatSchema.plugin(timestamps);
ChatSchema.plugin(query);
ChatSchema.plugin(autopopulate);

ChatSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Chat', ChatSchema);
