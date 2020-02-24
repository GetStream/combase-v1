module.exports = {
	apps: [
		{
			name: 'api',
			script: 'dist/index.js',
			instances: process.env.WEB_CONCURRENCY || 1,
			exec_mode: 'cluster',
			autorestart: true,
			watch: false
		}
	]
};
