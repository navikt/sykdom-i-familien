'use strict';

require('dotenv').config();
require('source-map-support').install();

const { optimize, extendDefaultPlugins } = require('svgo');
const sites = require('./build-utils/sites');

const SANITY_PROJECT_ID = '8ux9tyb9';
const SANITY_DATASET = process.env.DATASET;

require('ts-node').register({
    compilerOptions: {
        module: 'commonjs',
        target: 'es2017',
    },
});

const pageCreator = require('./build-utils/create-pages');

const createPagesForSite = async (site, onlyPublicPages, { graphql, actions }) => {
    await pageCreator.createFrontpage(
        site,
        { graphql, actions },
        onlyPublicPages,
        './src/templates/frontpagePageTemplate.tsx'
    );
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
    console.log('Use only public pages:', onlyPublicPages);
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

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes, createFieldExtension } = actions;

    const typeDefs = `
      type pdfLink implements Node @childOf(types: ["SanityPdf"]) {
        id: ID!
      }
      type optimizedSvg implements Node @childOf(types: ["SanityIllustration"]) {
        id: ID!
      }
    `;
    createTypes(typeDefs);
};
const getFileUrlFromRef = (ref) => {
    const [_file, id, extension] = ref.split('-');
    return `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}.${extension}`;
};

async function onCreateNode({ node, actions, createNodeId, createContentDigest }) {
    if (node.internal.type === 'SanityPdf' && node.file) {
        const pdfNode = {
            id: createNodeId(`pdf-${node.id}`),
            url: getFileUrlFromRef(node.file.asset._ref),
            children: [],
            parent: node.id,
            internal: {
                contentDigest: createContentDigest({}),
                type: 'pdfLink',
            },
        };
        const { createNode, createParentChildLink } = actions;
        createNode(pdfNode);
        createParentChildLink({ parent: node, child: pdfNode });
        return;
    }

    if (node.internal.type !== 'SanityIllustration') {
        return;
    }

    if (node.svg) {
        const optimizedSvg = await optimize(node.svg);
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
