import mongoose, { Schema } from 'mongoose';
import findOneOrCreate from 'mongoose-findoneorcreate';
import mongooseStringQuery from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';

export const UserSchema = new Schema(
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
		organization: {
			type: Schema.Types.ObjectId,
			ref: 'Organization',
			required: true
		},
		enriched: {
			type: Schema.Types.Mixed,
			default: {}
		}
	},
	{
		collection: 'users'
	}
);

UserSchema.plugin(findOneOrCreate);
UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);

UserSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('User', UserSchema);
