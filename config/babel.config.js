module.exports = {
  babelrc: false,
  presets: [
    [
      'env',
      {
        loose: true,
        modules: false,
        spec: false,
        targets: {
          browsers: ['> 1%', 'ie >= 9', 'last 2 versions']
        },
        useBuiltins: false
      }
    ],
    'stage-2',
    'react'
  ],
  comments: false,
  plugins: ['transform-react-constant-elements'],
  env: {
    development: {
      plugins: ['react-hot-loader/babel']
    }
  }
}
