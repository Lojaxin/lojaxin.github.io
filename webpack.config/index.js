const { merge } = require('webpack-merge');
const defaultConfig = require('./webpack.default.js');
const devConfig = require('./webpack.dev.js');
const serverConfig = require('./webpack.server.js');

module.exports = function ({ development }) {
    return merge(defaultConfig, development ? devConfig : serverConfig);
};
