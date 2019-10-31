import React from 'react';
import { injectIntl, Link } from 'gatsby-plugin-intl';
import FrontpagePoster from '../components/pages/frontpage/components/frontpage-poster/FrontpagePoster';
import { InjectedIntlProps } from 'react-intl';
import FrontpagePanelWrapper from '../components/pages/frontpage/components/frontpage-panel-wrapper/FrontpagePanelWrapper';
import StrokeHeader from '../components/pages/frontpage/components/stroke-header/StrokeHeader';
import { RouterProps } from '@reach/router';
import Frontpage from '../components/pages/frontpage/Frontpage';
import Box from '../components/layout/box/Box';
import LinkPanel from '../components/pages/frontpage/components/link-panel/LinkPanel';
import { graphql } from 'gatsby';
import { FrontpageSanityContentSchema, SanityIllustrationSchema } from '../sanity/schema-types';
import { getSanityContentWithLocale } from '../utils/sanity/getSanityContentWithLocale';
import SanityBlockContent from '../sanity/components/sanity-block-content/SanityBlockContent';
import SanityIllustration from '../sanity/components/sanity-illustration/SanityIllustrationContent';

interface Props {
    data: any;
}

// const PosterIllustration = require('../assets/familie.svg');
const Veiviser = require('../assets/veiviser.svg');

const extractFrontpageData = (data: FrontpageSanityContentSchema, locale: string): FrontpageSanityData => {
    const { _rawIllustration, _rawIngress, _rawTitle } = data;
    return {
        title: getSanityContentWithLocale(_rawTitle, locale),
        ingress: getSanityContentWithLocale(_rawIngress, locale),
        illustration: {
            title: _rawIllustration.name,
            svg: _rawIllustration.svg
        }
    };
};

export interface FrontpageSanityData {
    title: string;
    ingress: string;
    illustration: SanityIllustrationSchema;
}

const Hovedside: React.FunctionComponent<Props> = ({
    data,
    intl,
    location
}: Props & InjectedIntlProps & RouterProps) => {
    const { title, ingress, illustration } = extractFrontpageData(data.allSanityFrontpage.nodes[0], intl.locale);
    return (
        <Frontpage
            header={
                <FrontpagePoster
                    title={title}
                    illustration={<SanityIllustration illustration={illustration} maintainAspectRatio={true} />}>
                    <SanityBlockContent content={ingress} />
                </FrontpagePoster>
            }>
            <Box padHorizontal="l">
                <FrontpagePanelWrapper>
                    <LinkPanel title={'Sykt barn?'} url={`/pleiepenger-sykt-barn/`} image={<Veiviser />}>
                        Optio sequi facilis cum expedita nostrum unde iste laborum. Ea, illum
                    </LinkPanel>
                    <LinkPanel title={'Pleiepenger nærstående'} url={`/pleiepenger-sykt-barn/`} image={<Veiviser />}>
                        Harum asperiores ullam inventore reiciendis sit aperiam eum fugit qui aliquam?
                    </LinkPanel>
                    <LinkPanel title={'Inventore reiciendis'} url={`/pleiepenger-sykt-barn/`} image={<Veiviser />}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing.
                    </LinkPanel>
                </FrontpagePanelWrapper>
                <Box margin="xl">
                    <StrokeHeader>Utfyllende informasjon</StrokeHeader>
                    <FrontpagePanelWrapper>
                        <LinkPanel title={'Sykt barn?'} url={`/pleiepenger-sykt-barn/`} layout="plain">
                            Optio sequi facilis cum expedita nostrum unde iste laborum. Ea, illum
                        </LinkPanel>
                        <LinkPanel title={'Sykt barn?'} url={`/pleiepenger-sykt-barn/`} layout="plain">
                            Optio sequi facilis cum expedita nostrum unde iste laborum. Ea, illum
                        </LinkPanel>
                        <LinkPanel title={'Sykt barn?'} url={`/pleiepenger-sykt-barn/`} layout="plain">
                            Optio sequi facilis cum expedita nostrum unde iste laborum. Ea, illum
                        </LinkPanel>
                    </FrontpagePanelWrapper>
                </Box>
                <Box margin="xl">
                    <StrokeHeader>Relatert informasjon</StrokeHeader>
                    <FrontpagePanelWrapper>
                        <Box textAlignCenter={true}>
                            <Link to="/pleiepenger-sykt-barn" className="lenke" rel="noopener noreferrer">
                                Pleiepenger
                            </Link>
                        </Box>
                        <Box textAlignCenter={true}>
                            <Link to="/pleiepenger-sykt-barn" className="lenke" rel="noopener noreferrer">
                                Pleiepenger
                            </Link>
                        </Box>
                    </FrontpagePanelWrapper>
                </Box>
            </Box>
        </Frontpage>
    );
};

export const pageQuery = graphql`
    {
        allSanityFrontpage(filter: { _id: { eq: "frontpage-config" } }) {
            nodes {
                _id
                _rawTitle
                _rawIngress
                _rawIllustration(resolveReferences: { maxDepth: 4 })
                _rawFrontpageStories(resolveReferences: { maxDepth: 4 })
                _rawRelated(resolveReferences: { maxDepth: 4 })
            }
        }
    }
`;

export default injectIntl(Hovedside);
