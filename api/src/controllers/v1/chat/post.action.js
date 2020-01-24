import Chat from 'models/chat';
import User from 'models/user';

exports.post = async (req, res) => {
	try {
		const { user, chat, organization } = req.body;

		// if the user does not exist, create them in the database
		await User.findOneOrCreate(
			{ email: user.email },
			{
				name: {
					first: user.name.first,
					last: user.name.last,
				},
				email: user.email,
				organization: organization,
			}
		);

		const create = await Chat.create(chat);
		res.status(200).json(create);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
