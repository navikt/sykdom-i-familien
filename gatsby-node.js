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
    const pages = await graphql(`
        query {
            allSanityYtelsePage${includeNonPublicPagesOnlyInDevFilter} {
                edges {
                    node {
                        ytelse {
                            id
                            name
                            formUrl
                        }
                        slug {
                            current
                        }
                        _rawTitle
                        _rawIntro
                        _rawInShortTitle
                        _rawBanner(resolveReferences: { maxDepth: 4 })
                        _rawIllustration(resolveReferences: { maxDepth: 4 })
                        _rawInShort
                        _rawContent(resolveReferences: { maxDepth: 10 })
                    }
                }
            }
        }
    `);

    const { createPage } = actions;
    pages.data.allSanityYtelsePage.edges.forEach(({ node }) => {
        createPage({
            path: node.slug.current,
            component: path.resolve(`./src/templates/ytelsePageTemplate.tsx`),
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
