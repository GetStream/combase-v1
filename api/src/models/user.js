import mongoose, { Schema } from 'mongoose';
import findOneOrCreate from 'mongoose-findoneorcreate';
import query from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';
import autopopulate from 'mongoose-autopopulate';
import 'mongoose-type-email';

import StreamClient from 'utils/stream';

mongoose.SchemaTypes.Email.defaults.message = 'Invalid email address.';

export const UserSchema = new Schema(
	{
		avatar: {
			type: String,
			trim: true,
		},
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
			address: {
				type: mongoose.SchemaTypes.Email,
				lowercase: true,
				trim: true,
				required: true,
			},
			verified: {
				type: Boolean,
				default: false,
			},
		},
		phone: {
			type: String,
			trim: true,
			default: '',
		},
		enriched: {
			type: Schema.Types.Mixed,
			default: {},
		},
		refs: {
			tags: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Tag',
					autopopulate: true,
				},
			],
			organization: {
				type: Schema.Types.ObjectId,
				ref: 'Organization',
				required: true,
				autopopulate: true,
			},
		},
	},
	{
		collection: 'users',
	}
);

UserSchema.plugin(findOneOrCreate);
UserSchema.plugin(timestamps);
UserSchema.plugin(query);
UserSchema.plugin(autopopulate);

// TODO: Update users stream user data
// on save.
// UserSchema.post('save', async user => {
// 	try {
// 		const { client } = await StreamClient();
// 		await client.updateUsers([
// 			{
// 				id: user._id,
// 				image: user.avatar || '',
// 				name: `${user.name.first} ${user.name.last.charAt(0)}.`,
// 				role: 'user',
// 			},
// 		]);
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

UserSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('User', UserSchema);
