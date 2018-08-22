/**
 * Created by unsad on 2017/9/21.
 */
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const nodeExtenals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config.js');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(baseConfig, {
  entry: './src/server-entry.ts',
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-bundle.js'
  },
  resolve: {
    alias: {
      'create-api': './create-api-server.js'
    }
  },
  externals: nodeExtenals({
    whitelist: /\.css$/
  }),
  plugins: [
    new VueSSRServerPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"',
      'process.env.serverHost': JSON.stringify(process.env.serverHost || 'localhost')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
});
