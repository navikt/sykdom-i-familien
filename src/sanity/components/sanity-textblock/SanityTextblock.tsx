import React from 'react';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Undertittel } from 'nav-frontend-typografi';
import SanityBlock from '../sanity-block/SanityBlock';
import { getOptionalLocaleString, getLocaleBlockContent } from '../../utils';
import { TextblockObject } from '../../types/objects';
import bemUtils from '../../../utils/bemUtils';
import CheckBullet from './assets/CheckBullet';

import './sanityTextblock.less';

interface Props {
    textblock: TextblockObject;
}

const bem = bemUtils('textblock');

const SanityTextblock: React.FunctionComponent<Props & InjectedIntlProps> = ({ textblock: node, intl }) => {
    const title = getOptionalLocaleString(node.title, intl.locale);
    const content = getLocaleBlockContent(node.content, intl.locale);

    return (
        <div className={bem.classNames(bem.block, bem.modifierConditional(node.layout, node.layout !== undefined))}>
            {node.layout === 'step' && (
                <span className={bem.element('stepBullet')}>
                    <CheckBullet />
                </span>
            )}
            {title && <Undertittel tag={'h3'}>{title}</Undertittel>}
            <SanityBlock content={content} />
        </div>
    );
};

export default injectIntl(SanityTextblock);
