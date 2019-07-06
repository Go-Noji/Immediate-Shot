const MODE = 'development';

module.exports = {
	mode: MODE,
	entry: {
		background: "./src/background.ts",
		options: "./src/options.ts",
		page: "./src/page.ts",
	},
	output: {
		filename: '[name].bundle.js',
		path: `${__dirname}/extension`
	},
	devtool: MODE === 'development' ? 'inline-source-map' : '',
	module: {
		rules: [
			{
				test: /\.ts$/,
        use: "ts-loader"
			}
		]
	},
  resolve: {
    extensions: [".ts"]
  }
};
