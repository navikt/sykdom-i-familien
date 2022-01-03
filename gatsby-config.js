require('dotenv').config();

console.log(`Using dataset [${process.env.DATASET}]`);

const config = {
    pathPrefix: `/familie/sykdom-i-familien`,
    siteMetadata: {
        title: `Sykdom i familien`,
        title_nb: `Sykdom i familien`,
        title_nn: `Sjukdom i familien`,
    },
    plugins: [
        'gatsby-plugin-nodejs',
        'gatsby-plugin-remove-trailing-slashes',
        {
            resolve: `gatsby-plugin-compile-es6-packages`,
            options: {
                modules: [`query-string`],
            },
        },
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: '8ux9tyb9',
                dataset: `${process.env.DATASET}`,
                token: `${process.env.SANITY_TOKEN}`,
                watchMode: process.env.WATCH_MODE,
                overlayDrafts: process.env.OVERLAY_DRAFTS,
            },
        },
        {
            resolve: `nav-decorator`,
        },
        {
            resolve: 'gatsby-plugin-react-svg',
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-typescript`,
        `gatsby-plugin-tslint`,
        {
            resolve: `gatsby-plugin-less`,
            options: {
                globalVars: {
                    coreModulePath: `"~"`,
                    nodeModulesPath: `"~"`,
                },
            },
        },
        {
            resolve: `gatsby-plugin-intl`,
            options: {
                path: `${__dirname}/src/i18n`,
                languages: [`nb`, `nn`],
                defaultLanguage: `nb`,
                redirect: true,
            },
        },
    ],
};

module.exports = config;
