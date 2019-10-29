import React from 'react';
import { getSanityContentWithLocale } from '../../../utils/sanity/getSanityContentWithLocale';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Undertittel } from 'nav-frontend-typografi';
import SanityBlockContent from '../sanity-block-content/SanityBlockContent';

interface Props {
    node: any;
}

const SanityTitleAndText: React.FunctionComponent<Props & InjectedIntlProps> = ({ node, intl }) => {
    const title = getSanityContentWithLocale(node.title, intl.locale);
    const content = getSanityContentWithLocale(node.content, intl.locale);

    return (
        <div className="titleAndText">
            <Undertittel tag={'h3'}>{title}</Undertittel>
            <SanityBlockContent content={content} />
        </div>
    );
};

export default injectIntl(SanityTitleAndText);
