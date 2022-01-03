const express = require('express');
const gatsby = require('gatsby-plugin-nodejs');
const compression = require('compression');

const server = express();
server.use(compression());

gatsby.prepare({ app: server }, () => {
    // Here you can define your routes
});

const port = process.env.PORT || 8080;

server.listen(port, () => console.log(`listening on port ${port}`));
