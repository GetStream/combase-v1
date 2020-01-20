import mongoose, { Schema } from 'mongoose';
import mongooseStringQuery from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';

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
				default: 1
			},
			comment: {
				type: String,
				trim: true,
				default: ''
			}
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		agent: {
			type: Schema.Types.ObjectId,
			ref: 'Agent',
			required: true
		},
		organization: {
			type: Schema.Types.ObjectId,
			ref: 'Organization',
			required: true
		},
		status: {
			type: String,
			enum: [ 'Open', 'Closed', 'Pending User', 'Pending Agent', 'Closed', 'Archived' ],
			default: 'Open'
		}
	},
	{
		collection: 'chats'
	}
);

ChatSchema.plugin(timestamps);
ChatSchema.plugin(mongooseStringQuery);

ChatSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Chat', ChatSchema);
