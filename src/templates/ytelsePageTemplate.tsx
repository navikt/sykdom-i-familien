import React from 'react';
import { graphql } from 'gatsby';
import SanityYtelsePage from '../sanity/components/sanity-ytelse-page/SanityYtelsePage';

export default (props: any) => {
    return <SanityYtelsePage data={props.data.allSanityYtelsePage.edges[0].node} />;
};

export const query = graphql`
    query($slug: String!) {
        allSanityYtelsePage(filter: { slug: { current: { eq: $slug } } }) {
            edges {
                node {
                    showLanguageToggle
                    ytelse {
                        id
                        name
                        formUrl
                    }
                    slug {
                        current
                    }
                    site
                    _rawMetadescription
                    _rawTitle
                    _rawIntro
                    _rawInShortTitle
                    _rawInShortEkstraKomponenter
                    _rawBanner(resolveReferences: { maxDepth: 4 })
                    _rawIllustration(resolveReferences: { maxDepth: 4 })
                    _rawMessage(resolveReferences: { maxDepth: 4 })
                    _rawInShort
                    _rawContent(resolveReferences: { maxDepth: 10 })
                }
            }
        }
    }
`;
