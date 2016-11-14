const { resolve } = require('path');

module.exports = config => {

    config.set({
        basePath: resolve(''),

        frameworks: ['jasmine'],

        files: [
            { pattern: 'test/**/*.tsx' }
        ],

        preprocessors: {
            // add webpack as preprocessor
            'src/**/*.tsx': ['sourcemap'],
            'test/**/*.tsx': ['webpack', 'sourcemap']
        },

        webpack: {
            devtool: 'inline-source-map',
            resolve: {

                /*
                * An array of extensions that should be used to resolve modules.
                *
                * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
                */
                extensions: ['.ts', '.tsx', '.js', '.json'],

                // An array of directory names to be resolved to the current directory
                modules: [resolve('src'), 'node_modules'],

            },
            module: {
                rules: [
                    {
                        test: /\.tsx$/,
                        loaders: [
                            'awesome-typescript-loader'
                        ],
                        exclude: [/\.(spec|e2e)\.ts$/, /node_modules/]
                    },
                    {
                        test: /\.json$/,
                        loader: 'json',
                    },
                ]
            },
            externals: {
                'jsdom': 'window',
                'cheerio': 'window',
                'react/lib/ExecutionEnvironment': 'true',
                'react/addons': 'true',
                'react/lib/ReactContext': 'window'
            },
        },


        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        },

        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
        ],

        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
    });
};