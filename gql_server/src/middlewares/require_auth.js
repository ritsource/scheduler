module.exports = (req, res, next) => {
	// if (process.env.NODE_ENV === 'development') {
	//   if (!req.user) {
	//     console.warn('No Authentication');
	//     req.user = { _id : '5c34b0d7a04a8b0d78bcf5ac' }
	//   };
	// }

	if (!req.user) {
		return res.status(401).send({ error: 'You must log in!' });
	}

	next();
};
