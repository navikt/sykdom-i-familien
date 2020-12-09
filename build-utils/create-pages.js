const path = require('path');

const getPageFilter = (site, onlyPublicPages) => {
    let filters = [];
    if (site) {
        filters.push(`site: {eq: "${site.key}"}`);
    }
    if (onlyPublicPages) {
        filters.push(`isPublic: {eq: true}`);
    }
    return `(filter: {${filters.join(', ')}})`;
};

const getPagePath = (site, slug) => {
    return `${site.path}${slug}`;
};

const createFrontpage = async (site, { graphql, actions }, onlyPublicPages, template) => {
    const query = `
    query {
        allSanityFrontpage${getPageFilter(site, onlyPublicPages)} {
            edges {
                node {
                    _id
                    site
                }
            }
        }
    }`;

    const pages = await graphql(query);
    pages.data["allSanityFrontpage"].edges.forEach(({ node }) => {
        if (node && node._id) {
            console.log(`Created frontpage with path: ${site.path}`)
            actions.createPage({
                path: site.path,
                component: path.resolve(template),
                context: {
                    _id: node._id,
                    site: node.site,
                },
            });
        } else {
            console.error('Undefined node or node._id', node);
        }
    });
};
const createPages = async (documentType, site, onlyPublicPages, { graphql, actions }, template) => {
    const query = `
    query {
        ${documentType}${getPageFilter(site, onlyPublicPages)} {
            edges {
                node {
                    _id
                    slug {
                        current
                    }
                    site
                }
            }
        }
    }`;

    const pages = await graphql(query);
    pages.data[documentType].edges.forEach(({ node }) => {
        if (node && node.slug) {
            const pagePath = getPagePath(site, node.slug.current),;
            console.log(`Created page with path: ${pagePath}`)
            actions.createPage({
                path: pagePath,
                component: path.resolve(template),
                context: {
                    _id: node._id,
                    slug: node.slug.current,
                    site: node.site,
                },
            });
        } else {
            console.error('Undefined node or node.slug', node);
        }
    });
};

module.exports = {
    createFrontpage,
    createPages,
};
