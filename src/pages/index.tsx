import React from 'react';
import { RouterProps } from '@reach/router';
import { graphql } from 'gatsby';
import { InjectedIntlProps, injectIntl } from 'gatsby-plugin-intl';
import SanityFrontpage from '../sanity/components/sanity-frontpage/SanityFrontpage';
import { extractFrontpageData } from '../sanity/utils/frontpageUtils';
import { Site } from '../utils/site';

interface Props {
    data: any;
}

const Hovedside: React.FunctionComponent<Props> = ({ data, intl }: Props & InjectedIntlProps & RouterProps) => {
    const frontpageData = extractFrontpageData(data, intl.locale);
    if (!frontpageData) {
        return <div>Det oppstod en feil under lasting av siden</div>;
    }
    return <SanityFrontpage data={frontpageData} site={Site.sykdomIFamilien} />;
};

export const pageQuery = graphql`
    {
        allSanityFrontpage(filter: { _id: { eq: "frontpage-config" } }) {
            nodes {
                site
                showLanguageToggle
                _id
                _rawMetadescription
                _rawTitle
                _rawIngress
                _rawContent(resolveReferences: { maxDepth: 4 })
                _rawIllustration(resolveReferences: { maxDepth: 4 })
                _rawFrontpageStories(resolveReferences: { maxDepth: 4 })
            }
        }
    }
`;

export default injectIntl(Hovedside);
