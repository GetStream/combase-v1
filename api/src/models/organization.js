import mongoose, { Schema } from 'mongoose';
import query from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';

export const OrganizationSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true
		},
		meta: {
			logo: {
				type: String,
				trim: true,
				required: true
			},
			tagline: {
				type: String,
				trim: true
			},
			colors: {
				primary: {
					type: String,
					trim: true,
					default: '#4D7CFE'
				},
				secondary: {
					type: String,
					trim: true,
					default: '#ffffff'
				}
			}
		},
		phone: {
			number: {
				type: String,
				trim: true
			},
			display: {
				type: Boolean,
				default: false
			}
		},
		email: {
			address: {
				type: String,
				trim: true
			},
			display: {
				type: Boolean,
				default: true
			}
		},
		website: {
			url: {
				type: String,
				trim: true
			},
			display: {
				type: Boolean,
				default: true
			}
		},
		welcome: {
			message: {
				type: String,
				trim: true,
				default: 'Welcome! Type a message to get started and we will connect you with an available agent!'
			},
			enabled: {
				type: Boolean,
				default: false
			}
		},
		response: {
			type: String,
			enum: [
				'Typically replies in a few minutes.',
				'Typically replies in under 5 minutes.',
				'Typically replies in a few hours.',
				'Typically replies in a day.'
			],
			default: 'Typically replies in a few minutes.'
		}
	},
	{
		collection: 'organizations'
	}
);

OrganizationSchema.plugin(timestamps);
OrganizationSchema.plugin(query);

OrganizationSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Organization', OrganizationSchema);
