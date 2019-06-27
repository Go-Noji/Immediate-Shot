const MODE = 'development';

module.exports = {
	mode: MODE,
	entry: {
		background: "./src/background.js",
		inner: "./src/inner.js",
		options: "./src/options.js",
		page: "./src/page.js",
	},
	output: {
		filename: '[name].bundle.js',
		path: `${__dirname}/extension`
	},
	devtool: MODE === 'development' ? 'inline-source-map' : '',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ['@babel/preset-env']
						}
					}
				]
			}
		]
	}
};
