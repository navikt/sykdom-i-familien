import * as React from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import { getHeadingTag, getLocaleBlockContent, getOptionalLocaleString } from '../../sanity/utils';
import SanityBlock from '../../sanity/components/sanity-block/SanityBlock';
import Lenke from 'nav-frontend-lenker';
import { LocaleRichTextObject, LocaleStringObject } from '../../sanity/types/locale-objects';
import { LinkKnapp } from '../../sanity/types/objects';
import { SanityContentHeadingLevel } from '../../sanity/types';
import { InjectedIntlProps } from 'gatsby-plugin-intl';
import './infopanelMedKnapper.less';

export interface InfopanelMedKnapper {
    _type: string;
    content: LocaleRichTextObject;
    title: LocaleStringObject;
    linkKnapper: LinkKnapp[];
}


interface OwnProps {
    infopanelMedKnapper: InfopanelMedKnapper;
    headingLevel: SanityContentHeadingLevel;
}

type Props = OwnProps & InjectedIntlProps;

const InfopanelMedKnapperView: React.FC<Props> = ({ infopanelMedKnapper, headingLevel, intl }) => {
    const blockContent = getLocaleBlockContent(infopanelMedKnapper.content, intl.locale);
    const blockTittel = getOptionalLocaleString(infopanelMedKnapper.title, intl.locale);
    return (
        <div>
            <Panel className={'infopanelMedKnapper'} border={true}>
                {blockTittel &&
                <Undertittel tag={getHeadingTag(headingLevel)}>{blockTittel}</Undertittel>
                }
                <SanityBlock content={blockContent}/>
                <>
                    {infopanelMedKnapper && infopanelMedKnapper.linkKnapper.map((linkButton: LinkKnapp, linkButtonIndex: number) => (
                        <span key={linkButtonIndex}>
                            <Lenke className={'knapp knapp--hoved air'}
                                   href={linkButton.url}>{linkButton.text.nb}
                            </Lenke>
                        </span>
                    ))}
                </>
            </Panel>
        </div>
    );
};

export default InfopanelMedKnapperView;