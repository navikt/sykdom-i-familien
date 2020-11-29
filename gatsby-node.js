'use strict';

require('dotenv').config();
require('source-map-support').install();
const svgoProps = require('./gatsbyUtils/svgoProps');
const SVGO = require('svgo');
const sites = require('./build-utils/sites');

const svgo = new SVGO(svgoProps);

require('ts-node').register({
    compilerOptions: {
        module: 'commonjs',
        target: 'es2017',
    },
});

const pageCreator = require('./build-utils/create-pages');

const createPagesForSite = async (site, onlyPublicPages, { graphql, actions }) => {
    await pageCreator.createPages(
        'allSanityYtelsePage',
        site,
        onlyPublicPages,
        { graphql, actions },
        './src/templates/ytelsePageTemplate.tsx'
    );
    await pageCreator.createPages(
        'allSanityCustomPage',
        site,
        onlyPublicPages,
        { graphql, actions },
        './src/templates/customPageTemplate.tsx'
    );
    await pageCreator.createPages(
        'allSanitySectionPage',
        site,
        onlyPublicPages,
        { graphql, actions },
        './src/templates/sectionPageTemplate.tsx'
    );
};

exports.createPages = async (tools) => {
    const onlyPublicPages = process.env.ENV !== 'dev';
    console.log('onlyPublicPages:', onlyPublicPages);
    await createPagesForSite(sites.privatperson, onlyPublicPages, tools);
    await createPagesForSite(sites.arbeidsgiver, onlyPublicPages, tools);
    await createPagesForSite(sites.samarbeid, onlyPublicPages, tools);
};

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        externals: {
            canvas: 'commonjs canvas',
        },
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
                type: 'optimizedSvg',
            },
        };
        const { createNode, createParentChildLink } = actions;
        createNode(svgNode);
        createParentChildLink({ parent: node, child: svgNode });
    }
}

exports.onCreateNode = onCreateNode;
