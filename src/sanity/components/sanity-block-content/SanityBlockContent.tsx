import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { Undertittel } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { getSanityContentWithLocale } from '../../../utils/sanity/getSanityContentWithLocale';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import SanityIllustration from '../sanity-illustration/SanityIllustrationContent';
import Box from '../../../components/box/Box';
import Veileder from '../../../components/veileder/Veileder';
import SanityTabs from '../sanity-grouped-content/SanityGroupedContent';
import SanityTitleAndText from '../sanity-title-and-text/SanityTitleAndText';
import {
    SanityGroupedContentSchema,
    SanityIllustrationSchema,
    SanityExpandableContentSchema
} from '../../schema-types';

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
                illustration: (props: { node: SanityIllustrationSchema }) => {
                    return (
                        <Box padBottom="l">
                            <SanityIllustration illustration={props.node} inline={false} />
                        </Box>
                    );
                },
                // localeContent: (props: { node: SanityLocaleContentSchema }) => {
                //     const title = getSanityContentWithLocale(props.node.title, intl.locale);
                //     const contentBlocks = getSanityContentWithLocale(props.node.content, intl.locale);
                //     return (
                //         <section>
                //             <Undertittel>{title}</Undertittel>
                //             <BlockContent blocks={contentBlocks} />
                //         </section>
                //     );
                // },
                expandableContent: (props: { node: SanityExpandableContentSchema }) => {
                    const title = getSanityContentWithLocale(props.node.title, intl.locale);
                    const contentBlocks = getSanityContentWithLocale(props.node.content, intl.locale);
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
                groupedContent: ({ node }: { node: SanityGroupedContentSchema }) => <SanityTabs node={node} />,
                titleAndText: ({ node }: any) => {
                    return <SanityTitleAndText node={node} />;
                },
                block: BlockRenderer
            }
        }}
    />
);

export default injectIntl(SanityBlockContent);
