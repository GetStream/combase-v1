import mongoose, { Schema } from 'mongoose';
import query from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';
import autopopulate from 'mongoose-autopopulate';

export const PluginSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		keys: [
			{
				name: {
					type: String,
					trim: true,
				},
				value: {
					type: String,
					trim: true,
				},
			},
		],
		refs: {
			organization: {
				type: Schema.Types.ObjectId,
				ref: 'Organization',
				required: true,
				autopopulate: true,
			},
		},
	},
	{
		collection: 'plugins',
	}
);

PluginSchema.plugin(timestamps);
PluginSchema.plugin(query);
PluginSchema.plugin(autopopulate);

PluginSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Plugin', PluginSchema);
