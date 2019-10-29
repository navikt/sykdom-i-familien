const path = require('path');
const fs = require('fs');
const grayMatter = require('gray-matter');

// const { createFilePath } = require(`gatsby-source-filesystem`); // const fs = require('fs');

const DEFAULT_LANGUAGE = 'nb';

const PATH_TO_MD_PAGES = path.resolve('src/content');

const isMarkdownNode = (n) => n.internal.mediaType === `text/markdown`;

const loadMarkdownFile = (node) => {
    return grayMatter(fs.readFileSync(node.absolutePath, 'utf-8').toString());
};

const _wrapGraphql = (graphql) => async (str) => {
    const result = await graphql(str);
    if (result.errors) {
        throw result.errors;
    }
    return result;
};

const getMarkdownInfoFromNode = (node) => {
    const relativePath = path.relative(PATH_TO_MD_PAGES, node.absolutePath);
    const tok = relativePath.split('/');
    const ytelse = tok[0];
    const lang = tok[1];
    const pageId = tok.slice(2).join('/');
    return {
        lang,
        ytelse,
        pageId
    };
};

exports.onCreateNode = ({ node, getNodes, actions }) => {
    const { createNodeField } = actions;
    if (isMarkdownNode(node)) {
        const { lang, pageId, ytelse } = getMarkdownInfoFromNode(node);
        file = loadMarkdownFile(node);

        const pageData = {
            pageId,
            lang,
            ytelse,
            file,
            versions: []
        };

        if (lang === DEFAULT_LANGUAGE) {
            getNodes().forEach((n) => {
                if (isMarkdownNode(n)) {
                    const res = getMarkdownInfoFromNode(n);
                    if (res.pageId === pageId) {
                        const md = loadMarkdownFile(n);
                        pageData.versions.push({
                            lang: res.lang,
                            markdown: md.content
                        });
                    }
                }
            });
        }
        createNodeField({ node, name: 'page', value: pageData });
    }
};

const _createMarkdownPages = ({ pages, getNode, createPage }, cb) => {
    pages.forEach(({ id, relativePath }, index) => {
        const node = getNode(id);
        const {
            fields: {
                page: { path: pagePath, lang }
            }
        } = node;

        if (DE === lang) {
            createPage({
                path: pagePath,
                component: PAGE_TEMPLATE,
                context: {
                    relativePath,
                    ...(cb ? cb(index, node) : null)
                }
            });
        }
    });
};
exports.createPages = async ({ graphql, actions, getNode }) => {
    const { createPage, createNodeField } = actions;
    const _graphql = _wrapGraphql(graphql);

    const {
        data: {
            allFile: { nodes: blogPages }
        }
    } = await _graphql(`
    {
      allFile( filter: { fields: { page: { ytelse: { eq: "pleiepenger" } } } }) {
        nodes {
          id
          relativePath
        }
      }
    }
  `);
    _createMarkdownPages({ pages: blogPages, getNode, createPage }, (index) => {
        const newerPageId = 0 < index ? blogPages[index - 1].id : null;
        const olderPageId = blogPages.length - 1 > index ? blogPages[index + 1].id : null;
        return { newerPageId, olderPageId };
    });

    //     const {
    //         data: {
    //             allFile: { nodes: staticPages }
    //         }
    //     } = await _graphql(`
    //     {
    //       allFile( filter: { fields: { page: { type: { eq: "static" } } } } ) {
    //         nodes {
    //           id
    //           relativePath
    //         }
    //       }
    //     }
    //   `);
    //     _createMarkdownPages({ pages: staticPages, getNode, createPage });

    //     createPage({
    //         path: '/archives',
    //         component: ARCHIVES_TEMPLATE,
    //         context: {}
    //     });
};

exports.onCreateWebpackConfig = ({ stage, rules, loaders, plugins, actions }) => {
    actions.setWebpackConfig({
        externals: {
            canvas: 'commonjs canvas'
        }
    });
};
