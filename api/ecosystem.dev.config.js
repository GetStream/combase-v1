module.exports = {
	apps: [
		{
			name: 'api',
			script: 'src/index.js',
			interpreter: 'babel-node',
			watch: true,
			ignore_watch: ['.git', 'node_modules'],
		},
		{
			name: 'worker',
			script: 'src/workers/index.js',
			interpreter: 'babel-node',
			watch: true,
			ignore_watch: ['.git', 'node_modules'],
		},
	],
};
