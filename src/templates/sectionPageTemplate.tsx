import React from 'react';
import { graphql } from 'gatsby';
import SanitySectionPage from '../sanity/components/sanity-sectionpage/SanitySectionPage';

export default (props: any) => {
    return <SanitySectionPage data={props.data.allSanitySectionPage.edges[0].node} />;
};

export const query = graphql`
    query($slug: String!) {
        allSanitySectionPage(filter: { slug: { current: { eq: $slug } } }) {
            edges {
                node {
                    showLanguageToggle
                    showLeftMenu
                    slug {
                        current
                    }
                    site
                    _rawMetadescription
                    _rawTitle
                    _rawInShort
                    _rawInShortTitle
                    _rawInShortIllustration(resolveReferences: { maxDepth: 4 })
                    _rawContent(resolveReferences: { maxDepth: 10 })
                }
            }
        }
    }
`;
