import mongoose, { Schema } from 'mongoose';
import query from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';
import autopopulate from 'mongoose-autopopulate';

export const FaqSchema = new Schema(
	{
		meta: {
			question: {
				type: String,
				trim: true,
				required: true,
				unique: true,
			},
			answer: {
				type: String,
				trim: true,
				required: true,
			},
		},
		refs: {
			organization: {
				type: Schema.Types.ObjectId,
				ref: 'Organization',
				required: true,
				autopopulate: true,
			},
			createdBy: {
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
		collection: 'faqs',
	}
);

FaqSchema.plugin(timestamps);
FaqSchema.plugin(query);
FaqSchema.plugin(autopopulate);

FaqSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Faq', FaqSchema);
