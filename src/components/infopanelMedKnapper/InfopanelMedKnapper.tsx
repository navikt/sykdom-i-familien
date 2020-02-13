import * as React from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import { getHeadingTag, getLocaleBlockContent, getLocaleString, getOptionalLocaleString } from '../../sanity/utils';
import SanityBlock from '../../sanity/components/sanity-block/SanityBlock';
import Lenke from 'nav-frontend-lenker';
import { LocaleRichTextObject, LocaleStringObject } from '../../sanity/types/locale-objects';
import { Lenkeknapp } from '../../sanity/types/objects';
import { isSanityContentHeadingLevel, SanityContentHeadingLevel } from '../../sanity/types';
import { InjectedIntlProps } from 'gatsby-plugin-intl';
import './infopanelMedKnapper.less';
import { isInfopanelMedKnapper } from '../../sanity/types/guards';

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

const InfopanelMedKnapperView: React.FC<Props> = ({ infopanelMedKnapper, headingLevel, intl }) => {
    if (invalidInput(infopanelMedKnapper, headingLevel)) {
        return null;
    }

    const blockContent = getLocaleBlockContent(infopanelMedKnapper.content, intl.locale);
    const blockTittel = getOptionalLocaleString(infopanelMedKnapper.title, intl.locale);
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
                                    {getLocaleString(linkButton.text, intl.locale)}
                                </Lenke>
                            </span>
                        ))}
                </>
            </Panel>
        </div>
    );
};

export default InfopanelMedKnapperView;
