const path = require('path');
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

//
// CONST
// ---
const PATH = p => path.resolve(__dirname, p);
const PATH_DIST = PATH('./dist');

//
// DevServer
// ----
const devServer = {
  host: '0.0.0.0',
  port: 3000,
  open: true,
  disableHostCheck: true,
  clientLogLevel: 'error',
  overlay: {
    warnings: false,
    errors: true
  },
  quiet: true,
  watchOptions: {
    poll: false
  }
};

//
// Rules
// ----
const rules = (IS_PROD) => [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [{
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }]
  }
];

//
// Plugins
// ---
const plugins = (IS_PROD) => {
  const list = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': IS_PROD ? '"production"' : '"development"'
    }),
    new FriendlyErrorsPlugin()
  ];

  if (IS_PROD) {

  } else {
    list.push(
      new webpack.HotModuleReplacementPlugin()
    );
    list.push(
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      })
    );
  }

  return list;
}

module.exports = (env, argv) => {
  // Build Env
  const IS_PROD = argv.mode === 'production';
  // Export Config
  return {
    entry: IS_PROD ? './src/index.tsx' : './src/test/index.tsx',
    mode: argv.mode,
    output: {
      path: PATH_DIST,
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'Store',
      publicPath: '/'
    },
    devtool: IS_PROD ? false : '#source-map',
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json']
    },
    devServer,
    module: {
      rules: rules(IS_PROD)
    },
    plugins: plugins(IS_PROD)
  }
};