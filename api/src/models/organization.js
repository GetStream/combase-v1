import mongoose, { Schema } from 'mongoose';
import query from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';
import shortid from 'shortid';
import uuid from 'uuid/v4';

export const OrganizationSchema = new Schema(
	{
		api: {
			public: {
				key: {
					type: String,
					trim: true,
					default: shortid.generate(),
				},
				secret: {
					type: String,
					trim: true,
					default: uuid(),
				},
			},
			private: {
				key: {
					type: String,
					trim: true,
					default: shortid.generate(),
				},
				secret: {
					type: String,
					trim: true,
					default: uuid(),
				},
			},
		},
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
				required: true,
			},
			colors: {
				primary: {
					type: String,
					trim: true,
				},
				secondary: {
					type: String,
					trim: true,
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
				required: true,
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
				required: true,
			},
			display: {
				type: Boolean,
				default: true,
			},
		},
		welcome: {
			message: {
				type: String,
				trim: true,
				default:
					'Welcome! Type a message to get started and we will connect you with an available agent!',
			},
			enabled: {
				type: Boolean,
				default: false,
			},
		},
		response: {
			type: String,
			enum: [
				'We typically reply in a few minutes.',
				'We typically reply in under 5 minutes.',
				'We typically reply in a few hours.',
				'We typically reply in a day.',
			],
			default: 'We typically reply in a few minutes.',
		},
		availability: {
			days: {
				type: String,
				enum: [
					'Daily',
					'Monday - Friday',
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday',
					'Sunday',
				],
				default: 'Daily',
			},
			hours: {
				from: {
					type: String,
					trim: true,
					default: '9:00 am',
				},
				to: {
					type: String,
					trim: true,
					default: '6:00 pm',
				},
			},
		},
		domains: [
			{
				url: {
					type: String,
					trim: true,
				},
			},
		],
	},
	{
		collection: 'organizations',
	}
);

OrganizationSchema.plugin(timestamps);
OrganizationSchema.plugin(query);

OrganizationSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Organization', OrganizationSchema);
