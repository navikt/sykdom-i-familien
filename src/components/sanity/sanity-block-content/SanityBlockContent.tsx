import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { Undertittel } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { getSanityContentWithLocale } from '../../../utils/sanity/getSanityContentWithLocale';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import SanityInlineSVG from '../sanity-inline-svg/SanityInlineSVG';
import Box from '../../box/Box';
import Veileder from '../../veileder/Veileder';
import SanityTabs from '../sanity-tabs/SanityTabs';
import { SanityTabsNode } from '../../../types/sanity-schema/sanityTabsNode';
import InternalCommon from '../sanity-internal-common/SanityInternalCommon';
import SanityTitleAndText from '../sanity-title-and-text/SanityTitleAndText';

interface Props {
    content: string;
}

const BlockRenderer = (props: any) => {
    const style = props.node.style || 'normal';

    if (/^h\d/.test(style)) {
        const level = style.replace(/[^\d]/g, '');
        return <Undertittel tag={`h${level}`}>{props.children}</Undertittel>;
    }

    return style === 'blockquote' ? (
        <blockquote className="my-block-quote">{props.children}</blockquote>
    ) : (
        <p>{props.children}</p>
    );
};

const SanityBlockContent: React.FunctionComponent<Props & InjectedIntlProps> = ({ content, intl }) => (
    <BlockContent
        blocks={content}
        serializers={{
            types: {
                internalCommon: (props: any) => {
                    return <InternalCommon {...props} titleTag="h3" />;
                },
                illustration: (props: any) => {
                    return (
                        <Box padBottom="l">
                            <SanityInlineSVG illustration={props.node} inline={false} />
                        </Box>
                    );
                },
                localeContent: ({ node }: any) => {
                    const title = getSanityContentWithLocale(node.title, intl.locale);
                    const contentBlocks = getSanityContentWithLocale(node.content, intl.locale);
                    return (
                        <section>
                            <Undertittel>{title}</Undertittel>
                            <BlockContent blocks={contentBlocks} />
                        </section>
                    );
                },
                expandableContent: (props: any) => {
                    const { node } = props;
                    const title = getSanityContentWithLocale(node.title, intl.locale);
                    const contentBlocks = getSanityContentWithLocale(node.content, intl.locale);
                    return (
                        <Ekspanderbartpanel tittel={title} border={true}>
                            <BlockContent blocks={contentBlocks} />
                        </Ekspanderbartpanel>
                    );
                },
                veilederpanel: ({ node }: any) => {
                    const contentBlocks = getSanityContentWithLocale(node.content, intl.locale);
                    return (
                        <Veileder ansikt={node.face || 'glad'} fargetema={node.color || 'normal'}>
                            <BlockContent blocks={contentBlocks} />
                        </Veileder>
                    );
                },
                tabs: ({ node }: { node: SanityTabsNode }) => <SanityTabs node={node} />,
                titleAndText: ({ node }: any) => {
                    return <SanityTitleAndText node={node} />;
                },
                block: BlockRenderer
            }
        }}
    />
);

export default injectIntl(SanityBlockContent);
