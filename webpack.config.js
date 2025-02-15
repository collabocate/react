const path = require('path');
const NpmDtsPlugin = require('npm-dts-webpack-plugin');

module.exports = {
  entry: './src/index.ts',

  mode: 'production',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '',
    globalObject: `typeof self !== 'undefined' ? self : this`,
    library: '@collabo-community/collabocate',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/collabocate/[hash][ext][query]'
        }
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts']
  },

  externals: {
    react: 'react'
  },

  plugins: [
    new NpmDtsPlugin({
      output: 'dist/index.d.ts'
    })
  ]
};
