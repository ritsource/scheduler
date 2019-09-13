const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
// const webpack = require('webpack');

// console.log('process.env.SERVER_URI', process.env.SERVER_URI);

const config = {
	entry: './src/apps/calendar/index.js',
	output: {
		filename: 'calendar.v2.0.0.js',
		path: path.resolve(__dirname, 'public')
	}
	// plugins: [
	// 	new webpack.DefinePlugin({
	// 		'process.env.SERVER_URI': process.env.SERVER_URI
	// 	})
	// ]
};

module.exports = merge(baseConfig, config);
