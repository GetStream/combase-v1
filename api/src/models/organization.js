import mongoose, { Schema } from 'mongoose';
import query from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';

export const OrganizationSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		meta: {
			logo: {
				type: String,
				trim: true,
				required: true,
			},
			tagline: {
				type: String,
				trim: true,
			},
			colors: {
				primary: {
					type: String,
					trim: true,
					default: '#ffffff',
				},
				secondary: {
					type: String,
					trim: true,
					default: '#000000',
				},
			},
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

OrganizationSchema.plugin(timestamps);
OrganizationSchema.plugin(query);

OrganizationSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Organization', OrganizationSchema);
