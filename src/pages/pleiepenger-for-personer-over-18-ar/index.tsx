import React from 'react';
import { RouterProps } from '@reach/router';
import { graphql } from 'gatsby';
import SanityYtelsePage from '../../sanity/components/sanity-ytelse-page/SanityYtelsePage';

export default (props: RouterProps & any) => {
    const { data, location } = props;
    return <SanityYtelsePage data={data.allSanityYtelsePage.edges[0].node} location={location} />;
};

export const pageQuery = graphql`
    {
        allSanityYtelsePage(filter: { slug: { current: { eq: "pleiepenger-for-personer-over-18-ar" } } }) {
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
