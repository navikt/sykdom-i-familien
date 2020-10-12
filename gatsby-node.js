'use strict';

require('dotenv').config();
require('source-map-support').install();
const path = require('path');
const svgoProps = require('./gatsbyUtils/svgoProps');
const SVGO = require('svgo');

const svgo = new SVGO(svgoProps);

require('ts-node').register({
    compilerOptions: {
        module: 'commonjs',
        target: 'es2017'
    }
});

exports.createPages = async ({ graphql, actions }) => {
    const includeNonPublicPagesOnlyInDevFilter = process.env.ENV !== 'dev' ? ` (filter: {isPublic: {eq: true}})` : '';
    console.log(includeNonPublicPagesOnlyInDevFilter, process.env.ENV);
    const ytelsePages = await graphql(`
        query {
            allSanityYtelsePage${includeNonPublicPagesOnlyInDevFilter} {
                edges {
                    node {
                        slug {
                            current
                        }
                    }
                }
            }
        }
    `);

    const { createPage } = actions;
    ytelsePages.data.allSanityYtelsePage.edges.forEach(({ node }) => {
        createPage({
            path: node.slug.current,
            component: path.resolve(`./src/templates/ytelsePageTemplate.tsx`),
            context: {
                slug: node.slug.current
            }
        });
    });

    /** FAQ pages */
    const customPages = await graphql(`
        query {
            allSanityCustomPage {
                edges {
                    node {
                        slug {
                            current
                        }
                    }
                }
            }
        }
    `);
    customPages.data.allSanityCustomPage.edges.forEach(({ node }) => {
        createPage({
            path: node.slug.current,
            component: path.resolve(`./src/templates/customPageTemplate.tsx`),
            context: {
                slug: node.slug.current
            }
        });
    });

    /** Section pages */
    const sectionPages = await graphql(`
        query {
            allSanitySectionPage${includeNonPublicPagesOnlyInDevFilter} {
                edges {
                    node {
                        slug {
                            current
                        }
                    }
                }
            }
        }
    `);

    sectionPages.data.allSanitySectionPage.edges.forEach(({ node }) => {
        console.log('Creating SectionPage', node.slug.current);
        createPage({
            path: node.slug.current,
            component: path.resolve(`./src/templates/sectionPageTemplate.tsx`),
            context: {
                slug: node.slug.current
            }
        });
    });
};

exports.onCreateWebpackConfig = ({ stage, rules, loaders, plugins, actions }) => {
    actions.setWebpackConfig({
        externals: {
            canvas: 'commonjs canvas'
        }
    });
};

async function onCreateNode({ node, actions, createNodeId, createContentDigest }) {
    if (node.internal.type !== 'SanityIllustration') {
        return;
    }

    if (node.svg) {
        const optimizedSvg = await svgo.optimize(node.svg);
        const svgNode = {
            id: createNodeId(`svgo-${node.id}`),
            svg: optimizedSvg.data,
            children: [],
            parent: node.id,
            internal: {
                contentDigest: createContentDigest({}),
                type: 'optimizedSvg'
            }
        };
        const { createNode, createParentChildLink } = actions;
        createNode(svgNode);
        createParentChildLink({ parent: node, child: svgNode });
    }
}

exports.onCreateNode = onCreateNode;
