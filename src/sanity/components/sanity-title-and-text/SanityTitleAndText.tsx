import React from 'react';
import {
    getSanityContentWithLocale,
    getSanityStringWithLocale
} from '../../../utils/sanity/getSanityContentWithLocale';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Undertittel } from 'nav-frontend-typografi';
import SanityBlock from '../sanity-block/SanityBlock';

interface Props {
    node: any;
}

const SanityTitleAndText: React.FunctionComponent<Props & InjectedIntlProps> = ({ node, intl }) => {
    const title = getSanityStringWithLocale(node.title, intl.locale);
    const content = getSanityContentWithLocale(node.content, intl.locale);

    return (
        <div className="titleAndText">
            {title && <Undertittel tag={'h3'}>{title}</Undertittel>}
            <SanityBlock content={content} />
        </div>
    );
};

export default injectIntl(SanityTitleAndText);
