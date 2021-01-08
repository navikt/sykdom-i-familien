import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import SanityBlock from '../../../sanity/components/sanity-block/SanityBlock';
import { SanityContentHeadingLevel } from '../../../sanity/types';
import { BlockContentType } from '../../../sanity/types/parts';
import { getHeadingTag } from '../../../sanity/utils';
import PrintOnly from '../print-only/PrintOnly';
import ScreenOnly from '../screen-only/ScreenOnly';

interface Props {
    title: string;
    headingLevel: SanityContentHeadingLevel;
    blockContent: BlockContentType;
}

const FaqElement = ({ title, headingLevel, blockContent }: Props) => (
    <>
        <ScreenOnly>
            <Ekspanderbartpanel
                tittel={
                    <Element tag={getHeadingTag(headingLevel)} className={'faqTitle'}>
                        {title}
                    </Element>
                }
                renderContentWhenClosed={true}>
                <SanityBlock content={blockContent} />
            </Ekspanderbartpanel>
        </ScreenOnly>
        <PrintOnly>
            <Systemtittel tag={getHeadingTag(headingLevel)}>{title}</Systemtittel>
            <SanityBlock content={blockContent} />
        </PrintOnly>
    </>
);

export default FaqElement;
