import axios from 'axios';

export default async (req, res, next) => {
	console.log(req.get('cookie'));

	try {
		const response = await axios({
			url: 'http://server:5000/graphql',
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

		console.log(response.data.data.currentUser);

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
