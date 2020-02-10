import { Panel } from 'nav-frontend-paneler';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { LocaleSimpleTextObject } from '../../sanity/types/locale-objects';
import { TextblockObjectLayout } from '../../sanity/types/objects';
import Lenke from 'nav-frontend-lenker';
import './ekstraKomponent.less';
import SanityBlockContent from '../sanity-block-content/SanityBlockContent';


interface Span {
    text: string;
}

interface Block {
    children: Span[];
    style: TextblockObjectLayout;
}

interface LocaleRichText {
    nb: Block[];
    nn: Block[];
}

interface Link {
    text: LocaleSimpleTextObject;
    url: string;
}

interface TextBlock {
    title: LocaleSimpleTextObject;
    content: LocaleRichText;
    layout: TextblockObjectLayout;
}

export interface InfopanelMedKnapper {
    _type: string;
    textblock: TextBlock;
    linkKnapper: Link[];
}

interface Props {
    ekstrakomponenter: InfopanelMedKnapper[]
}

const genererVisningForListeAvEkstrakomponenter = (list: InfopanelMedKnapper[]) => {
    return list.map((infopanel: InfopanelMedKnapper, infopanelIndex) => {
        if (infopanel && infopanel._type && infopanel._type === 'infopanelMedKnapper') {

            return (
                <Panel key={infopanelIndex} border={true}>
                    <Ingress className={'air'}>
                        {infopanel.textblock.title.nb}
                    </Ingress>
                    {infopanel.textblock.content.nb.map((block: Block, blockIndex) => (
                        block.children.map((span: Span, spanIndex) => (
                            <Normaltekst className={'air'} key={spanIndex + blockIndex}>
                                {span.text}
                            </Normaltekst>
                        ))
                    ))}

                    <>
                        {infopanel.linkKnapper.map((linkButton, linkButtonIndex) => (
                            <span key={linkButtonIndex}>
                                <Lenke className={"knapp knapp--hoved air"} href={linkButton.url}>{linkButton.text.nb}</Lenke>
                            </span >
                        ))}
                    </>
                </Panel>
            );
        }
        // TODO: Match på komponent-type of rendre
        return <SanityBlockContent content={infopanel} headingLevel={3} key={infopanelIndex}/>;
    });
};

export const EkstraKomponent: React.FC<Props> = (props: Props) => {
    if (props.ekstrakomponenter && props.ekstrakomponenter.length > 0) {
        return (
            <>
                {genererVisningForListeAvEkstrakomponenter(props.ekstrakomponenter)}
            </>
        );
    }
    return null;
};