import fs from 'fs'
import glob from 'glob'
import path from 'path'

// Current working directory.
const currentDir = process.cwd()
// Ensure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(currentDir)
const resolvePath = relativePath => path.resolve(appDirectory, relativePath)

const PATHS = {
  app: resolvePath('src'),
  assets: resolvePath('src/shared/assets'),
  babelConfig: require(resolvePath('config/babel.config.js')),
  build: resolvePath('dist'),
  devtoolModule: function(info) {
    return path.resolve(info.absoluteResourcePath)
  },
  dll: resolvePath('dll'),
  env: resolvePath('.env'),
  favicon: resolvePath('src/shared/assets/favicon/favicon.ico'),
  // Uncomment this for `favicons-webpack-plugin`
  // image: resolvePath('src/shared/assets/images/spy_kid.png'),
  indexHtml: resolvePath('public/index.ejs'),
  nodeModules: resolvePath('node_modules'),
  packageJson: resolvePath('package.json'),
  polyfills: resolvePath('config/polyfills'),
  postCssConfig: resolvePath('config/postcss.config.js'),
  public: resolvePath('public'),
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  purifyCssPaths: glob.sync(`${resolvePath('src')}/**/*.js`),
  root: currentDir,
  shared: resolvePath('src/shared'),
  styles: resolvePath('src/shared/styles'),
  vendorFilepath: resolvePath('dll/vendors.dll.js'),
  vendorManifest: resolvePath('dll/vendors-manifest.json'),
  yarnLockFile: resolvePath('yarn.lock')
}

export default PATHS
