import React from 'react';
import { RouterProps } from '@reach/router';
import { graphql } from 'gatsby';
import { InjectedIntlProps, injectIntl } from 'gatsby-plugin-intl';
import SanityFrontpage from '../sanity/components/sanity-frontpage/SanityFrontpage';
import { extractFrontpageData } from '../sanity/utils/frontpageUtils';

interface Props {
    data: any;
}

const FrontpageTemplate: React.FunctionComponent<Props> = ({ data, intl }: Props & InjectedIntlProps & RouterProps) => {
    const frontpageData = extractFrontpageData(data, intl.locale);
    if (!frontpageData) {
        return <div>Error in parsing data</div>;
    }
    return <SanityFrontpage data={frontpageData} site={frontpageData.site} />;
};

export const query = graphql`
    query($site: String!) {
        allSanityFrontpage(filter: { site: { eq: $site } }) {
            nodes {
                showLanguageToggle
                site
                _id
                _rawMetadescription
                _rawTitle
                _rawIngress
                _rawContent(resolveReferences: { maxDepth: 4 })
                _rawFooterContent(resolveReferences: { maxDepth: 4 })
                _rawFooterContent(resolveReferences: { maxDepth: 4 })
                _rawIllustration(resolveReferences: { maxDepth: 4 })
                _rawFrontpageStories(resolveReferences: { maxDepth: 4 })
            }
        }
    }
`;

export default injectIntl(FrontpageTemplate);
