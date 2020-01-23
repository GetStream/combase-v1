import 'dotenv/config';
import mongoose from 'mongoose';

const db = mongoose.connection;

mongoose.promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

db.on('error', err => {
	console.error(err);
});

db.on('disconnected', () => {
	console.info('Database disconnected!');
});

process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		process.exit(0);
	});
});

export default db;
