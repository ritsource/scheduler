const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
// const webpack = require('webpack');

const config = {
	entry: './src/apps/extra/index.js',
	output: {
		filename: 'extra.v2.0.0.js',
		path: path.resolve(__dirname, 'public')
	}
	// plugins: [
	// 	new webpack.DefinePlugin({
	// 		'process.env.SERVER_URI': process.env.SERVER_URI
	// 	})
	// ]
};

module.exports = merge(baseConfig, config);
