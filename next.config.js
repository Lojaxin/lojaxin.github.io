const path = require('path')

module.exports = {
    experimental: {
        forceSwcTransforms: true,
    },
    //开启sass内置扩展
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}