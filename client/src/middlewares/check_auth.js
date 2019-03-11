import axios from 'axios';

export default async (req, res, next) => {
	try {
		const response = await axios({
			url: `http://${process.env.SERVER_URI}:5000/graphql`,
			method: 'post',
			headers: { cookie: req.get('cookie') || '' },
			data: {
				query: `
					query currentUser {
						currentUser {
							_id
							googleId
							facebookId
							email
							name
							avatar_url
							custom_colors
						}
					}
				`
			}
		});

		if (response.data.data.currentUser) {
			req._isAuth = true;
			next();
		} else {
			throw new Error('Not Authenticated');
		}
	} catch (error) {
		console.log('Not Authenticated');

		req._isAuth = false;
		next();
	}
};
