import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default {
	entry: ['./src/index.js'],
	mode: 'development',
	devtool: 'eval-source-map',
	watch: true,
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve('./dist/'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							['@babel/preset-react', {runtime: 'automatic'}],
						],
					},
				},
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
				],
			},
		],
	},
	optimization: {
		splitChunks: {
			automaticNameDelimiter: '.',
			chunks: 'all',
			name: 'vendor',
		},
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new HtmlWebpackPlugin({
			favicon: './src/favicon.ico',
			title: 'Airline',
			filename: 'index.html',
			template: './src/index.html',
		}),
	],
};
