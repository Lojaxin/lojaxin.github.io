const Builder = require('./builder');

const builder = new Builder({
    outputPath: 'dist',
    inputPath: 'public/docs'
})

builder.build();