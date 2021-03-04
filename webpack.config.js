const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.jsx',
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
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-react']
					}
				}
			}, {
				test: /\.css$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader']
			}, {
                test: /\.woff2$/,
                exclude: /node_modules/,
                use: "file-loader"
            },
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new AssetsPlugin({fullPath: true})
	]
}
