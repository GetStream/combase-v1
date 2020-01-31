export default [
	{
		path: 'health',
		method: 'get',
		auth: false,
	},
	{
		path: 'auth',
		method: 'post',
		auth: true,
	},
	{
		path: 'configs',
		method: 'get',
		auth: true,
	},
	{
		path: 'password-reset',
		method: 'post',
		auth: true,
	},
	{
		path: 'organizations',
		method: 'post',
		auth: true,
	},
];
