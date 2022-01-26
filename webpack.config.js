const path = require('path')
const glob = require('glob')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')


module.exports = (env, argv) => {
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
					use: {
						loader: "babel-loader",
						options: {
							presets: ['@babel/preset-react']
						}
					}
				}, {
					test: /\.s[ac]ss$/i,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"sass-loader"
					],
				}, {
					test: /\.css$/,
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
			new HtmlWebpackPlugin({
				title: 'Loading...',
				favicon: './src/images/favicon.ico'
			}),
		],
		stats: {
			children: false,
			version: false,
			hash: false,
			modules: false,
		},
	}
	
	if(argv.mode === 'production') {
		config.plugins.push(
			new PurgeCSSPlugin({
				paths: glob.sync('./src/**/*.js?(x)', { nodir: true })
			}),
			new CssMinimizerPlugin({
				minimizerOptions: {
					preset: [ 'default', {
						discardComments: {removeAll: true}, 
						cssDeclarationSorter: true,
					}],
				},
			}),
		)
		config.optimization = {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					minify: TerserPlugin.uglifyJsMinify,
					extractComments: 'false',
				}),
			],
		}
	}
	else
		config.module.rules.push({
			test: /\.js$/,
			enforce: 'pre',
			use: ['source-map-loader'],
		})
	
	return config
}
