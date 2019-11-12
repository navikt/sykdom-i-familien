import React, { ReactNode } from 'react';
import PanelBase from 'nav-frontend-paneler';
import { Systemtittel } from 'nav-frontend-typografi';
import bemUtils from '../../utils/bemUtils';
import './panelWithTitleAndIllustration.less';

const bem = bemUtils('panelWithTitleAndIllustration');

const PanelWithTitleAndIllustration = ({
    id,
    title,
    illustration,
    children,
    titleTag = 'h2',
    illustrationPlacement = 'inside'
}: {
    title?: string;
    illustration?: React.ReactNode;
    children: ReactNode;
    id?: string;
    titleTag?: string;
    illustrationPlacement?: 'inside' | 'outside';
}) => {
    return (
        <section
            id={id}
            aria-label={title}
            className={bem.classNames(
                bem.block,
                bem.modifierConditional('withIllustration', illustration !== undefined),
                bem.modifierConditional(
                    'illustrationOutside',
                    illustration !== undefined && illustrationPlacement === 'outside'
                )
            )}>
            <PanelBase className={bem.element('panel')}>
                {illustration && <div className={bem.element('illustration')}>{illustration}</div>}
                {title && (
                    <div className={bem.element('title')}>
                        <Systemtittel tag={titleTag}>{title}</Systemtittel>
                    </div>
                )}
                {children}
            </PanelBase>
        </section>
    );
};

export default PanelWithTitleAndIllustration;
