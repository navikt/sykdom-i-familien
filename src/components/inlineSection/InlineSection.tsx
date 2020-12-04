import React, { ReactNode } from 'react';
import bemUtils from '../../utils/bemUtils';
import TitleWithLine from '../elements/titleWithLine/TitleWithLine';
// import './sectionPanel.less';

const bem = bemUtils('sectionPanel');

interface Props {
    id?: string;
    title?: string;
    illustration?: React.ReactNode;
    children: ReactNode;
    titleTag?: string;
}

const InlineSection = ({ id, title, illustration, children, titleTag = 'h2' }: Props) => {
    return (
        <section tabIndex={-1} id={id} aria-label={title} className={bem.block}>
            {illustration && <div className={bem.element('illustration')}>{illustration}</div>}
            {title && (
                <div className={bem.element('title')}>
                    <TitleWithLine title={title} tag={titleTag} />
                </div>
            )}
            {children}
        </section>
    );
};

export default InlineSection;
