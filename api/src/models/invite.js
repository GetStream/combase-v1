import mongoose, { Schema } from 'mongoose';
import query from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';

export const InviteSchema = new Schema(
	{
		name: {
			first: {
				type: String,
				trim: true,
				required: true,
			},
			last: {
				type: String,
				trim: true,
				required: true,
			},
		},
		email: {
			type: String,
			lowercase: true,
			trim: true,
			required: true,
		},
		organization: {
			type: Schema.Types.ObjectId,
			ref: 'Organization',
			required: true,
		},
		accepted: {
			type: Boolean,
			default: false,
		},
	},
	{
		collection: 'invites',
	}
);

InviteSchema.plugin(timestamps);
InviteSchema.plugin(query);

InviteSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Invite', InviteSchema);
