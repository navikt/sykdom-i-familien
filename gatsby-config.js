require('dotenv').config();

module.exports = {
    siteMetadata: {
        title: `Sykdom i familien`
    },
    plugins: [
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: '8ux9tyb9',
                dataset: 'utvikling',
                token: `${process.env.SANITY_TOKEN}`,
                watchMode: true,
                overlayDrafts: true
            }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `GatsbyJS`,
                short_name: `GatsbyJS`,
                start_url: `/`,
                background_color: `#6b37bf`,
                theme_color: `#6b37bf`,
                display: `standalone`,
                icon: `src/images/icon.png` // This path is relative to the root of the site.
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/src/`
            }
        },
        {
            resolve: `nav-decorator`
        },
        {
            resolve: 'gatsby-plugin-react-svg'
        },
        `gatsby-plugin-offline`,
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
        `gatsby-plugin-styled-components`,
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
