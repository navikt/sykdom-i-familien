import React from 'react';
import { graphql } from 'gatsby';
import SanityYtelsePage from '../sanity/components/sanity-ytelse-page/SanityYtelsePage';

export default (props: any) => {
    const { data } = props;
    return <SanityYtelsePage data={data.allSanityYtelsePage.edges[0].node} />;
};

export const query = graphql`
    query($slug: String!) {
        allSanityYtelsePage(filter: { slug: { current: { eq: $slug } } }) {
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
`;