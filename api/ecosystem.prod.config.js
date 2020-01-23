module.exports = {
	apps: [
		{
			name: 'api',
			script: 'dist/index.js',
			instances: process.env.WEB_CONCURRENCY || 1,
			exec_mode: 'cluster',
			autorestart: true,
			watch: false,
		},
		{
			name: 'worker',
			script: 'dist/workers/index.js',
			instances: process.env.WEB_CONCURRENCY || 1,
			autorestart: true,
			watch: false,
		},
	],
};
