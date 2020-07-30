const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: {
		botchikee: './src/botchikee/index.jsx',
	},
	output: {
		filename: '[name]/[contenthash].js',
		
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
				loader: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-react']
					}
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new AssetsPlugin({fullPath: true})
	]
}
