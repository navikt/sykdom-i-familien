const express = require('express');
const gatsyExpress = require('gatsby-plugin-express');

const server = express();

server.get('/isAlive', (req, res) => res.sendStatus(200));
server.get('/isReady', (req, res) => res.sendStatus(200));

server.use(express.static('public/'));
server.use(
    gatsyExpress('gatsby-express.json', {
        publicDir: 'public/',
        template: 'public/404/index.html',
        redirectSlashes: true
    })
);

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});
