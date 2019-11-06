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
        allSanityYtelsePage(filter: { slug: { current: { eq: "pleiepenger-for-sykt-barn" } } }) {
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
                    _rawIllustration(resolveReferences: { maxDepth: 4 })
                    _rawInShort
                    _rawContent(resolveReferences: { maxDepth: 10 })
                }
            }
        }
    }
`;
