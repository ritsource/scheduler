const isProd = process.env.NODE_ENV !== 'development';

module.exports = {
	mode: isProd ? 'production' : 'development',
	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	}
};
