import mongoose, { Schema } from 'mongoose';
import findOneOrCreate from 'mongoose-findoneorcreate';
import mongooseStringQuery from 'mongoose-string-query';
import bcrypt from 'mongoose-bcrypt';
import timestamps from 'mongoose-timestamp';

export const AgentSchema = new Schema(
	{
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
			type: String,
			lowercase: true,
			trim: true,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
			bcrypt: true,
		},
	},
	{
		collection: 'agents',
	}
);

AgentSchema.plugin(findOneOrCreate);
AgentSchema.plugin(bcrypt);
AgentSchema.plugin(timestamps);
AgentSchema.plugin(mongooseStringQuery);

AgentSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = exports = mongoose.model('Agent', AgentSchema);
