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

const createPages = async (documentType, site, onlyPublicPages, { graphql, actions }, template) => {
    const query = `
    query {
        ${documentType}${getPageFilter(site, onlyPublicPages)} {
            edges {
                node {
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
    createPages,
};
