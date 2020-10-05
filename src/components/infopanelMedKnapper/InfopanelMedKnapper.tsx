import * as React from 'react';
import { InjectedIntlProps } from 'gatsby-plugin-intl';
import Lenke from 'nav-frontend-lenker';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import SanityBlock from '../../sanity/components/sanity-block/SanityBlock';
import { isSanityContentHeadingLevel, SanityContentHeadingLevel } from '../../sanity/types';
import { isInfopanelMedKnapper } from '../../sanity/types/guards';
import { LocaleRichTextObject, LocaleStringObject } from '../../sanity/types/locale-objects';
import { Lenkeknapp } from '../../sanity/types/objects';
import { getHeadingTag, getLocaleBlockContent, getLocaleString, getOptionalLocaleString } from '../../sanity/utils';
import './infopanelMedKnapper.less';

export const invalidInput = (
    infopanelMedKnapper: InfopanelMedKnapper | any,
    headingLevel: SanityContentHeadingLevel | any
) => {
    return !(isInfopanelMedKnapper(infopanelMedKnapper) && isSanityContentHeadingLevel(headingLevel));
};

export interface InfopanelMedKnapper {
    _type: string;
    content: LocaleRichTextObject;
    title: LocaleStringObject;
    lenkeknapper: Lenkeknapp[];
}

interface OwnProps {
    infopanelMedKnapper: InfopanelMedKnapper | any;
    headingLevel: SanityContentHeadingLevel | any;
}

type Props = OwnProps & InjectedIntlProps;

const InfopanelMedKnapperView: React.FC<Props> = ({ infopanelMedKnapper, headingLevel, intl: { locale } }) => {
    if (invalidInput(infopanelMedKnapper, headingLevel)) {
        return null;
    }

    const blockContent = getLocaleBlockContent(infopanelMedKnapper.content, locale);
    const blockTittel = getOptionalLocaleString({ obj: infopanelMedKnapper.title, locale });
    return (
        <div>
            <Panel className={'infopanelMedKnapper'} border={true}>
                {blockTittel && <Undertittel tag={getHeadingTag(headingLevel)}>{blockTittel}</Undertittel>}
                <SanityBlock content={blockContent} />
                <>
                    {infopanelMedKnapper &&
                        infopanelMedKnapper.lenkeknapper.map((linkButton: Lenkeknapp, linkButtonIndex: number) => (
                            <span key={linkButtonIndex}>
                                <Lenke className={'knapp knapp--hoved infopanelKnapper'} href={linkButton.url}>
                                    {getLocaleString(linkButton.text, locale)}
                                </Lenke>
                            </span>
                        ))}
                </>
            </Panel>
        </div>
    );
};

export default InfopanelMedKnapperView;
