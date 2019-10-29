import React from 'react';
import { RouterProps } from '@reach/router';
import { graphql } from 'gatsby';
import SanityYtelsePage from '../../sanity/components/sanity-ytelse-page/SanityYtelsePage';
import { Normaltekst } from 'nav-frontend-typografi';

export default (props: RouterProps & any) => {
    const { data, location } = props;
    return (
        <Normaltekst tag="div">
            <SanityYtelsePage data={data.allSanityPage.edges[0].node} location={location} />;
        </Normaltekst>
    );
};

export const pageQuery = graphql`
    {
        allSanityPage(filter: { ytelse: { key: { eq: "pp-sykt-barn" } } }) {
            edges {
                node {
                    formUrl
                    _rawYtelse
                    _rawTitle
                    _rawIllustration(resolveReferences: { maxDepth: 4 })
                    _rawInShort
                    _rawContent(resolveReferences: { maxDepth: 10 })
                }
            }
        }
    }
`;
