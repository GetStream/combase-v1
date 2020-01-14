import mongoose, { Schema } from 'mongoose';
import findOneOrCreate from 'mongoose-findoneorcreate';
import mongooseStringQuery from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';

export const OrganizationSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		logo: {
			type: String,
			trim: true,
			required: true,
		},
		tagline: {
			type: String,
			trim: true,
		},
		phone: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
		},
	},
	{
		collection: 'organizatons',
	}
);

OrganizationSchema.plugin(findOneOrCreate);
OrganizationSchema.plugin(timestamps);
OrganizationSchema.plugin(mongooseStringQuery);

OrganizationSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Organization', OrganizationSchema);
