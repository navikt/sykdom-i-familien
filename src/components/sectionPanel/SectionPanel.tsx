import React, { ReactNode } from 'react';
import Panel from 'nav-frontend-paneler';
import bemUtils from '../../utils/bemUtils';
import TitleWithLine from '../elements/titleWithLine/TitleWithLine';

import './sectionPanel.less';
import { Systemtittel } from 'nav-frontend-typografi';

const bem = bemUtils('sectionPanel');

interface Props {
    id?: string;
    title?: string;
    illustration?: React.ReactNode;
    children: ReactNode;
    titleTag?: string;
    illustrationPlacement?: 'inside' | 'outside';
    titleStyle?: 'center' | 'plain';
}

const SectionPanel = ({
    id,
    title,
    illustration,
    children,
    titleTag = 'h2',
    illustrationPlacement = 'inside',
    titleStyle = 'center',
}: Props) => {
    return (
        <section
            tabIndex={-1}
            id={id}
            aria-label={title}
            className={bem.classNames(
                bem.block,
                bem.modifierConditional(
                    'illustrationOutside',
                    illustration !== undefined && illustrationPlacement === 'outside'
                ),
                bem.modifierConditional('plainTitle', titleStyle === 'plain')
            )}>
            <Panel className={bem.element('panel')}>
                {illustration && <div className={bem.element('illustration')}>{illustration}</div>}
                {title && (
                    <div className={bem.element('title')}>
                        {titleStyle === 'center' && <TitleWithLine title={title} tag={titleTag} />}
                        {titleStyle === 'plain' && <Systemtittel tag={titleTag}>{title}</Systemtittel>}
                    </div>
                )}
                {children}
            </Panel>
        </section>
    );
};

export default SectionPanel;
