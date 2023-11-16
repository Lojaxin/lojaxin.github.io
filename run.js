const path = require('path');
const fs = require('fs').promises;
const { createReadStream } = require('fs');
const express = require('express');

const app = express();

app.get('*', async (req, res) => {

    function sendStream(path) {
        const readStream = createReadStream(path);

        readStream.on('open', function () {
            readStream.pipe(res);
        });

        readStream.on('error', function (err) {
            res.end(err);
        });
    }

    const rootPath = path.resolve(__dirname, 'dist');
    const filePath = path.join(rootPath, decodeURIComponent(req.path));
    if (req.path === '/') {
        return sendStream(path.join(rootPath, 'index.html'));
    } else if (req.path.includes('.ico')) {
        return res.send('');;
    }
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
        res.send('is directory');
    } else {
        sendStream(filePath);
    }
});

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});


