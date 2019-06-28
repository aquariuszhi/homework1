const path = require('path');

module.exports = {
	mode: 'development',
	entry: './week10homework2_index.js',
	output:{
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	}
};