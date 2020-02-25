import mongoose, { Schema } from 'mongoose';
import query from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';
import autopopulate from 'mongoose-autopopulate';
import moment from 'moment';

export const InviteSchema = new Schema(
	{
		name: {
			first: {
				type: String,
				trim: true,
				required: true
			},
			last: {
				type: String,
				trim: true,
				required: true
			}
		},
		email: {
			type: String,
			lowercase: true,
			trim: true,
			required: true
		},
		refs: {
			organization: {
				type: Schema.Types.ObjectId,
				ref: 'Organization',
				required: true,
				autopopulate: true
			}
		},
		expiration: {
			type: Date,
			default: moment().add('48', 'hours').toISOString()
		},
		accepted: {
			type: Boolean,
			default: false
		}
	},
	{
		collection: 'invites'
	}
);

InviteSchema.plugin(timestamps);
InviteSchema.plugin(query);
InviteSchema.plugin(autopopulate);

InviteSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Invite', InviteSchema);
