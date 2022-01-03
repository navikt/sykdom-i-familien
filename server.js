const express = require('express');
const gatsby = require('gatsby-plugin-nodejs');

const app = express();

gatsby.prepare({ app }, () => {
    // Here you can define your routes
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening on port ${port}`));
