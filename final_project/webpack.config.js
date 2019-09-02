const path = require('path');

module.exports = {
	mode: "development",
	entry: './src/index.js',
	module: {
	  rules:[
		{ 
			test: /\.js$/,
			use: [
				"babel-loader"
			]
		},
		{ 
			test: /\.(scss|sass)$/,
			use: [
				"style-loader",
				"css-loader",
				"sass-loader"
			]	 
		},
		{ 
			test: /\.(gif|png|jpe?g|svg)$/i,
			use: [
				"file-loader"
			]	 
		}
	  ]
	},
	resolve:{
		alias: { 'react-dom': '@hot-loader/react-dom'  }
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist'
	}
};