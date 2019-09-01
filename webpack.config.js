// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

module.exports = (env, argv) => {
  return {
    mode: argv.mode || 'development',
    entry: './src/Index.tsx',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'default.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        'react': 'preact/compat',
        'react-dom': 'preact/compat',
      }
    },
    devServer: {
      inline: true,
      contentBase: './public',
      historyApiFallback: true,
      port: 3000
    },
    devtool: false,
    optimization: {
      minimizer: [
        //
        new TerserPlugin({
          parallel: true,
          sourceMap: true, // Must be set to true if using source-maps in production
          exclude: /\.min\.js$/i,
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            // using default options
          }
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer')({
                    'browserlist': ['ie>=10', '> 1%', 'last 2 versions']
                  }),
                ]
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.[tj]sx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader'
        },
        {
          test: /\.svg$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [
      // new ExtractTextPlugin({ filename: 'app.css' }),
      new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: 'index.html'
      }),
      new CopyWebpackPlugin([
        { from: 'public/img', to: 'img' }
      ])
      // new UglifyJsPlugin()
    ]
  }
}
