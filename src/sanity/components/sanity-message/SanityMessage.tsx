import React from 'react';
import { InjectedIntlProps, injectIntl } from 'gatsby-plugin-intl';
import AlertStripe from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import { MessageDocument } from '../../types/documents';
import { getLocaleBlockContent, getLocaleString } from '../../utils';
import SanityBlock from '../sanity-block/SanityBlock';
import './sanityMessage.less';

interface Props {
    message: MessageDocument;
}

const SanityMessage: React.FunctionComponent<Props & InjectedIntlProps> = ({ message, intl }) => {
    const title = getLocaleString(message.title, intl.locale);
    const blockContent = getLocaleBlockContent(message.content, intl.locale);
    return (
        <div className="sanityMessage">
            <AlertStripe type={message.style}>
                {title && <Undertittel className="sanityMessage__title">{title}</Undertittel>}
                <SanityBlock content={blockContent} />
            </AlertStripe>
        </div>
    );
};

export default injectIntl(SanityMessage);
