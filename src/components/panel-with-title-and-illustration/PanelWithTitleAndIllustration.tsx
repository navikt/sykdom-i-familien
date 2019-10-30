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
    titleTag = 'h2'
}: {
    title: string;
    illustration?: React.ReactNode;
    children: ReactNode;
    id?: string;
    titleTag?: string;
}) => {
    return (
        <section
            id={id}
            aria-label={title}
            className={bem.classNames(
                bem.block,
                bem.modifierConditional('withIllustration', illustration !== undefined)
            )}>
            <PanelBase>
                {illustration && <div className={bem.element('illustration')}>{illustration}</div>}
                <div className={bem.element('title')}>
                    <Systemtittel tag={titleTag}>{title}</Systemtittel>
                </div>
                {children}
            </PanelBase>
        </section>
    );
};

export default PanelWithTitleAndIllustration;
