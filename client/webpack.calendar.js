const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
	entry: './src/apps/calendar/index.js',
	output: {
		filename: 'calendar.v2.0.0.js',
		path: path.resolve(__dirname, 'public')
	}
};

module.exports = merge(baseConfig, config);
