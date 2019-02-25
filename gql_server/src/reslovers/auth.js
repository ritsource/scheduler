const { registerUser, loginUser } = require('../auth/auth_funcs');

module.exports = {
	registerUser: async (args, req) => {
		const { name, email, password } = args;
		return await registerUser({ name, email, password, req });
	},

	loginUser: async (args, req) => {
		const { email, password } = args;
		return await loginUser({ email, password, req });
	},

	logout: async (args, req) => {
		await req.logout(); // Passport Stuff
		return null;
	},

	currentUser: async (args, req) => {
		const user = req.user;
		if (user) {
			user.password = null;
			return user;
		}
	}
};
