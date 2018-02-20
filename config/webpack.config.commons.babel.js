import merge from 'webpack-merge'
import webpack from 'webpack'

import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import PATHS from './paths.babel'
import stats from './stats.babel'
import {
  lintJavaScript,
  loadJavaScript,
  setFreeVariable
} from './webpack.config.parts.babel'

const isProduction = process.env.NODE_ENV === 'production'

const commonsConfig = merge([
  setFreeVariable(
    'process.env.NODE_ENV',
    isProduction ? 'production' : 'development'
  ),
  setFreeVariable('process.env.API_URL', process.env.API_URL),
  loadJavaScript({
    include: PATHS.app,
    exclude: /node_modules/,
    query: PATHS.babelConfig
  }),
  {
    bail: true,
    context: PATHS.app,
    devtool: isProduction ? 'source-map' : '#cheap-module-eval-source-map',
    entry: {
      app: [
        isProduction ? PATHS.polyfills : 'react-hot-loader/patch',
        PATHS.app
      ]
    },
    module: {
      rules: [
        {
          exclude: [
            /\.html$/,
            /\.js$/,
            /\.css$/,
            /\.json$/,
            /\.bmp$/,
            /\.gif$/,
            /\.jpe?g$/,
            /\.png$/,
            /\.ejs$/
          ],
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]'
          }
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[hash:8].[ext]'
          }
        }
      ]
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new Dotenv({
        path: PATHS.env
      }),
      new HtmlWebpackPlugin({
        chunksSortMode: 'dependency',
        favicon: PATHS.favicon,
        filename: 'index.html',
        inject: true,
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        },
        seo: {
          description: 'Controlling my LIFX bulbs.',
          image: '',
          title: 'jordan-lifx',
          twitter_handle: '@j_mahc',
          url: 'https://github.com/jmahc'
        },
        template: PATHS.indexHtml,
        title: 'Control my LIFX bulbs!'
      }),
      new webpack.NamedModulesPlugin()
    ],
    resolve: {
      alias: {
        '@': PATHS.app,
        '%': PATHS.shared,
        '#': PATHS.styles
      },
      aliasFields: ['browser'],
      descriptionFiles: ['package.json'],
      enforceExtension: false,
      enforceModuleExtension: false,
      extensions: ['.js', '.json', '.ejs'],
      mainFields: ['browser', 'module', 'main'],
      mainFiles: ['index'],
      // Order matters below.
      modules: ['node_modules', PATHS.app, 'containers', 'components'],
      symlinks: true
    },
    stats,
    node: {
      console: false,
      global: true,
      process: true,
      __filename: false,
      __dirname: false,
      Buffer: false,
      setImmediate: false,
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    target: 'web'
  }
])

export default commonsConfig
