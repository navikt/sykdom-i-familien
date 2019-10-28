import React from 'react';
import { RouterProps } from '@reach/router';
import { graphql } from 'gatsby';
import YtelsePage from '../../components/sanity/sanity-page/SanityPage';

export default (props: RouterProps & any) => {
    const { data, location } = props;
    return <YtelsePage data={data.allSanityPage.edges[0].node} location={location} />;
};

export const pageQuery = graphql`
    {
        allSanityPage(filter: { ytelse: { key: { eq: "pp-sykt-barn" } } }) {
            edges {
                node {
                    _rawTitle
                    _rawIllustration(resolveReferences: { maxDepth: 4 })
                    _rawInShort
                    _rawContent(resolveReferences: { maxDepth: 10 })
                }
            }
        }
    }
`;
