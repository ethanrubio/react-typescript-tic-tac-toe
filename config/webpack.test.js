'use strict'

const helpers = require('./helpers');
const {resolve} = require('path');

/**
 * Webpack Plugins
 */
// const ProvidePlugin = require('webpack/lib/ProvidePlugin');
// const DefinePlugin = require('webpack/lib/DefinePlugin');
// const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
// const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = options => {
  return {

    /**
     * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
     *
     * Do not change, leave as is or it wont work.
     * See: https://github.com/webpack/karma-webpack#source-maps
     */
    devtool: 'inline-source-map',

    /**
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

      /**
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.tsx', '.js', '.json'],

      /**
       * Make sure root is src
       */
      modules: [ resolve(__dirname, 'src'), 'node_modules' ]

    },

    /**
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

      rules: [

        /**
         * Tslint loader support for *.ts files
         *
         * See: https://github.com/wbuchwalter/tslint-loader
         */
        {
          enforce: 'pre',
          test: /\.(ts|tsx)$/,
          loader: 'tslint-loader',
          exclude: [helpers.root('node_modules')]
        },

        /**
         * Source map loader support for *.js files
         * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
         *
         * See: https://github.com/webpack/source-map-loader
         */
        {
          enforce: 'pre',
          test: /\.(ts|tsx)$/,
          loader: 'source-map-loader',
          exclude: [
            // these packages have problems with their sourcemaps
            helpers.root('node_modules/rxjs'),
          ]
        },

        /**
         * Typescript loader support for .ts and Angular 2 async routes via .async.ts
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader
         */
        {
          test: /\.(ts|tsx)$/,
          loader: 'awesome-typescript-loader',
          query: {
            // use inline sourcemaps for "karma-remap-coverage" reporter
            sourceMap: false,
            inlineSourceMap: true,
            compilerOptions: {

              // Remove TypeScript helpers to be injected
              // below by DefinePlugin
              removeComments: true

            }
          },
          exclude: [/\.e2e\.ts$/]
        },

        /**
         * Json loader support for *.json files.
         *
         * See: https://github.com/webpack/json-loader
         */
        {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: [helpers.root('src/index.html')]
        },

        // /**
        //  * Raw loader support for *.css files
        //  * Returns file content as string
        //  *
        //  * See: https://github.com/webpack/raw-loader
        //  */
        // {
        //   test: /\.css$/,
        //   loaders: ['to-string-loader', 'css-loader'],
        //   exclude: [helpers.root('src/index.html')]
        // },

        // /**
        //  * Raw loader support for *.html
        //  * Returns file content as string
        //  *
        //  * See: https://github.com/webpack/raw-loader
        //  */
        // {
        //   test: /\.html$/,
        //   loader: 'raw-loader',
        //   exclude: [helpers.root('src/index.html')]
        // },

        /**
         * Instruments JS files with Istanbul for subsequent code coverage reporting.
         * Instrument only testing sources.
         *
         * See: https://github.com/deepsweet/istanbul-instrumenter-loader
         */
        {
          enforce: 'post',
          test: /\.(js|ts|tsx)$/,
          loader: 'istanbul-instrumenter-loader',
          include: helpers.root('src'),
          exclude: [
            /\.(e2e|spec)\.ts$/,
            /node_modules/
          ]
        }

      ]
    },

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    },

    externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': 'true',
        'react/addons': 'true',
        'react/lib/ReactContext': 'window'
    }

  };
}