const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProd = process.env.NODE_ENV !== 'development';

module.exports = {
	mode: isProd ? 'production' : 'development',
	entry: './src/styles/app.scss',
	output: {
		path: path.resolve(__dirname, 'public')
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles.v2.0.0.css'
		})
	],
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
			}
		]
	}
};
