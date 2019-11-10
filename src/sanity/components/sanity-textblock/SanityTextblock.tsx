import React from 'react';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Undertittel } from 'nav-frontend-typografi';
import SanityBlock from '../sanity-block/SanityBlock';
import { getOptionalLocaleString, getLocaleBlockContent } from '../../utils';
import { TextblockObject } from '../../types/objects';

interface Props {
    textblock: TextblockObject;
}

const SanityTextblock: React.FunctionComponent<Props & InjectedIntlProps> = ({ textblock: node, intl }) => {
    const title = getOptionalLocaleString(node.title, intl.locale);
    const content = getLocaleBlockContent(node.content, intl.locale);

    return (
        <>
            {title && <Undertittel tag={'h3'}>{title}</Undertittel>}
            <SanityBlock content={content} />
        </>
    );
};

export default injectIntl(SanityTextblock);
