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
					default: '#4D7CFE',
				},
				secondary: {
					type: String,
					trim: true,
					default: '#ffffff',
				},
			},
		},
		phone: {
			number: {
				type: String,
				trim: true,
			},
			display: {
				type: Boolean,
				default: false,
			},
		},
		email: {
			address: {
				type: String,
				trim: true,
			},
			display: {
				type: Boolean,
				default: true,
			},
		},
		website: {
			url: {
				type: String,
				trim: true,
			},
			display: {
				type: Boolean,
				default: true,
			},
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
