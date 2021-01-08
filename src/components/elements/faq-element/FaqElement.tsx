import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import SanityBlock from '../../../sanity/components/sanity-block/SanityBlock';
import { SanityContentHeadingLevel } from '../../../sanity/types';
import { BlockContentType } from '../../../sanity/types/parts';
import { getHeadingTag } from '../../../sanity/utils';
import bemUtils from '../../../utils/bemUtils';
import PrintOnly from '../print-only/PrintOnly';
import ScreenOnly from '../screen-only/ScreenOnly';
import './faqElement.less';

const bem = bemUtils('faqElement');
interface Props {
    title: string;
    headingLevel: SanityContentHeadingLevel;
    blockContent: BlockContentType;
}

const FaqElement = ({ title, headingLevel, blockContent }: Props) => (
    <div className={bem.block}>
        <ScreenOnly>
            <Ekspanderbartpanel
                tittel={
                    <Element tag={getHeadingTag(headingLevel)} className={bem.element('title')}>
                        {title}
                    </Element>
                }
                renderContentWhenClosed={true}>
                <SanityBlock content={blockContent} />
            </Ekspanderbartpanel>
        </ScreenOnly>
        <PrintOnly>
            <Systemtittel tag={getHeadingTag(headingLevel)} className={bem.element('title')}>
                {title}
            </Systemtittel>
            <SanityBlock content={blockContent} />
        </PrintOnly>
    </div>
);

export default FaqElement;
