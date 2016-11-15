const { resolve } = require('path');
const testWebpackConfig = require('./config/webpack.test.js')({env: 'test'});

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

        webpack: testWebpackConfig,

        coverageReporter: {
            reporters:[
                //{type: 'html', dir:'coverage/'},  // https://github.com/karma-runner/karma-coverage/issues/123
                {type: 'text'},
                {type: 'text-summary'}
            ],
        },

        // Webpack please don't spam the console when running in karma!
        webpackMiddleware: {
            quiet: true,
            stats: {
                colors: true
            }
        },

        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-sourcemap-writer',
            'karma-sourcemap-loader',
            'karma-coverage',
            'karma-remap-istanbul',
            'karma-spec-reporter',
            'karma-chrome-launcher',
        ],

        reporters: ['progress', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
    });
};

// old config
// coverageReporter: {
//     dir: 'coverage',
//     reporters: [
//         { type: 'text-summary' },
//         {
//         type: 'json',
//         subdir: '.',
//         file: 'coverage-final.json'
//         }
//     ]
// },

// remapIstanbulReporter: {
//     src: 'coverage/coverage-final.json',
//     reports: {
//         lcovonly: 'coverage/lcov.info',
//         html: 'coverage/report'
//     },
//     timeoutNotCreated: 5000,
//     timeoutNoMoreFiles: 1000
// },


// reporters: ['progress', 'coverage'], // 'karma-remap-istanbul' readd once fixed by github PRs
