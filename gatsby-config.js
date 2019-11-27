require('dotenv').config();

module.exports = {
    pathPrefix: `/familie/sykdom-i-familien`,
    siteMetadata: {
        title: `Sykdom i familien`,
        title_nb: `Sykdom i familien`,
        title_nn: `Sjukdom i familien`
    },
    plugins: [
        {
            resolve: `gatsby-plugin-compile-es6-packages`,
            options: {
                modules: [`query-string`]
            }
        },
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: '8ux9tyb9',
                dataset: `production`,
                token: `${process.env.SANITY_TOKEN}`,
                watchMode: false, // process.env.DATASET_ENV === 'staging' ? true : false,
                overlayDrafts: process.env.DATASET_ENV === 'staging' ? true : false
            }
        },
        {
            resolve: `nav-decorator`
        },
        {
            resolve: 'gatsby-plugin-react-svg'
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-typescript`,
        `gatsby-plugin-tslint`,
        {
            resolve: `gatsby-plugin-less`,
            options: {
                globalVars: {
                    coreModulePath: `"~"`,
                    nodeModulesPath: `"~"`
                }
            }
        },
        'gatsby-transformer-typescript-css-modules',
        {
            resolve: `gatsby-plugin-intl`,
            options: {
                path: `${__dirname}/src/i18n`,
                languages: [`nb`, `nn`],
                defaultLanguage: `nb`,
                redirect: true
            }
        }
    ]
};
