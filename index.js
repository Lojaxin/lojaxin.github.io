const Builder = require('./builder');

const build = new Builder({
    entry: 'notes',
    output: 'dist'
})

build.run();