import React from 'react';
import { InjectedIntlProps, injectIntl } from 'gatsby-plugin-intl';
import { Undertittel } from 'nav-frontend-typografi';
import bemUtils from '../../../utils/bemUtils';
import { SanityContentHeadingLevel } from '../../types';
import { TextblockObject } from '../../types/objects';
import { getHeadingTag, getLocaleBlockContent, getOptionalLocaleString } from '../../utils';
import SanityBlock from '../sanity-block/SanityBlock';
import CheckBullet from './assets/CheckBullet';
import './sanityTextblock.less';

interface Props {
    textblock: TextblockObject;
    headingLevel: SanityContentHeadingLevel;
}

const bem = bemUtils('textblock');

const SanityTextblock: React.FunctionComponent<Props & InjectedIntlProps> = ({
    textblock,
    headingLevel,
    intl: { locale }
}) => {
    const title = getOptionalLocaleString({ obj: textblock.title, locale });
    const content = getLocaleBlockContent(textblock.content, locale);

    return (
        <div
            className={bem.classNames(
                bem.block,
                bem.modifierConditional(textblock.layout, textblock.layout !== undefined)
            )}>
            {textblock.layout === 'step' && (
                <span className={bem.element('stepBullet')}>
                    <CheckBullet />
                </span>
            )}
            {title && <Undertittel tag={getHeadingTag(headingLevel)}>{title}</Undertittel>}
            <SanityBlock content={content} />
        </div>
    );
};

export default injectIntl(SanityTextblock);
