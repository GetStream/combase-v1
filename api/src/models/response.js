import mongoose, { Schema } from 'mongoose';
import query from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';
import autopopulate from 'mongoose-autopopulate';

export const ResponseSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
		},
		message: {
			type: String,
			trim: true,
			required: true,
		},
		refs: {
			organization: {
				type: Schema.Types.ObjectId,
				ref: 'Organization',
				required: true,
				autopopulate: true,
			},
			agent: {
				type: Schema.Types.ObjectId,
				ref: 'Agent',
				required: true,
				autopopulate: {
					select: ['name', 'email'],
				},
			},
		},
	},
	{
		collection: 'responses',
	}
);

ResponseSchema.plugin(timestamps);
ResponseSchema.plugin(query);
ResponseSchema.plugin(autopopulate);

ResponseSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Response', ResponseSchema);
