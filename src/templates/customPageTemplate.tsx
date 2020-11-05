import React from 'react';
import { graphql } from 'gatsby';
import SanityCustomPage from '../sanity/components/sanity-custom-page/SanityCustomPage';

export default (props: any) => {
    return <SanityCustomPage data={props.data.allSanityCustomPage.edges[0].node} />;
};

export const query = graphql`
    query($slug: String!) {
        allSanityCustomPage(filter: { slug: { current: { eq: $slug } } }) {
            edges {
                node {
                    slug {
                        current
                    }
                    site
                    _rawTitle
                    _rawIngress
                    _rawMetadescription
                    _rawIllustration(resolveReferences: { maxDepth: 5 })
                    _rawContent(resolveReferences: { maxDepth: 5 })
                }
            }
        }
    }
`;
