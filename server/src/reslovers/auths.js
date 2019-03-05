const { registerUser, loginUser, addCustomColor } = require('../auth/auth_funcs');

module.exports = {
	// Auth Resolvers
	registerUser: async (args, req) => {
		const { name, email, password } = args;
		return await registerUser({ name, email, password, req });
	}, // Register User

	loginUser: async (args, req) => {
		const { email, password } = args;
		return await loginUser({ email, password, req });
	}, // Login User

	logout: async (args, req) => {
		await req.logout(); // Passport Stuff
		return null;
	}, // Logout User

	currentUser: async (args, req) => {
		const user = req.user;
		if (user) {
			user.password = null;
			return user;
		}
	}, // Get Current Loggedin User

	addCustomColor: async (args, req) => {
		return await addCustomColor(args, req);
	}
};
