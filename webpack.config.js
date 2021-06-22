const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = (env, argv) => {
	const isProd = argv.mode == 'production'
	
	const config = {
		mode: 'development',
		entry: {
			main: './src/index.jsx',
		},
		output: {
			filename: '[contenthash].js',
			
			publicPath: '/build/',
			path: path.join(__dirname, './public/build')
		},
		resolve: {
			extensions: ['.js', '.jsx']
		},
		module: {
			rules: [
				{
					test: /\.jsx$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ['@babel/preset-react']
						}
					}
				},{
					test: /\.s[ac]ss$/i,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"sass-loader"
					],
				}, {
					test: /\.css$/,
					exclude: /node_modules/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader'
					]
				}, {
					test: /\.woff2$/,
					exclude: /node_modules/,
					use: "file-loader"
				},
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: '[contenthash].css'
			}),
			new HtmlWebpackPlugin(),
		],
		stats: {
			children: false,
			version: false,
			hash: false,
			modules: false,
		}
	}
	
	if(isProd) {
		config.plugins = [
			...config.plugins,
			new CssMinimizerPlugin({
				minimizerOptions: {
					preset: [ 'default', {
						discardComments: {removeAll: true}, 
						cssDeclarationSorter: true,
					}],
				},
			}),
		]
		config.optimization = {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					extractComments: 'false',
				}),
			],
		};
	}
	
	return config
}
