import React from 'react';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { getSanityContentWithLocale } from '../../../utils/sanity/getSanityContentWithLocale';
import { Undertittel } from 'nav-frontend-typografi';
import BlockContent from '../sanity-block-content/SanityBlockContent';

interface Props {
    node: {
        title: string;
        content: string;
    };
    titleTag: string;
}

const InternalCommon: React.FunctionComponent<Props> = (props: Props & InjectedIntlProps) => {
    const { titleTag = 'h2', node } = props;
    const title = getSanityContentWithLocale(node.title, props.intl.locale);
    return (
        <section>
            <Undertittel tag={titleTag}>{title}</Undertittel>
            <BlockContent content={node.content} />
        </section>
    );
};

export default injectIntl(InternalCommon);
