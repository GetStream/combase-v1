import mongoose, { Schema } from 'mongoose';
import query from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';
import autopopulate from 'mongoose-autopopulate';

export const TagSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
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
	{
		collection: 'tags',
	}
);

TagSchema.plugin(timestamps);
TagSchema.plugin(query);
TagSchema.plugin(autopopulate);

TagSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Tag', TagSchema);
