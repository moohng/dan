const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'dan.min.js',
    path: path.resolve(__dirname, 'build'),
    library: {
      name: 'dan',
      type: 'assign-properties',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'babel-loader',
        options: {},
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}
