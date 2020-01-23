import mongoose, { Schema } from 'mongoose';
import query from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';
import autopopulate from 'mongoose-autopopulate';

export const ChatSchema = new Schema(
	{
		meta: {
			id: {
				type: String,
				trim: true,
				required: true
			},
			subject: {
				type: String,
				trim: true,
				required: true
			},
			excerpt: {
				type: String,
				trim: true,
				required: true
			}
		},
		score: {
			rating: {
				type: Boolean,
				default: true
			},
			comment: {
				type: String,
				trim: true,
				default: ''
			}
		},
		notes: [
			{
				note: {
					type: String,
					trim: true
				},
				agent: {
					type: Schema.Types.ObjectId,
					ref: 'Agent',
					required: true,
					autopopulate: {
						select: [ 'name', 'email' ]
					}
				}
			}
		],
		refs: {
			user: {
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true,
				autopopulate: true
			},
			agent: {
				type: Schema.Types.ObjectId,
				ref: 'Agent',
				required: true,
				autopopulate: {
					select: [ 'name', 'email' ]
				}
			},
			organization: {
				type: Schema.Types.ObjectId,
				ref: 'Organization',
				required: true,
				autopopulate: true
			}
		},
		status: [
			{
				type: {
					type: String,
					enum: [ 'Open', 'Pending User', 'Pending Agent', 'Closed', 'Archived' ],
					default: 'Open'
				},
				timestamp: {
					type: Date,
					default: Date.now
				}
			}
		]
	},
	{
		collection: 'chats'
	}
);

ChatSchema.plugin(timestamps);
ChatSchema.plugin(query);
ChatSchema.plugin(autopopulate);

ChatSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Chat', ChatSchema);
