import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import bemUtils from '../../../utils/bemUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import './tabButton.less';

const bem = bemUtils('tabButton');

interface Props {
    label: string;
    icon?: React.ReactNode;
    isSelected: boolean;
    onSelect: () => void;
    compact?: boolean;
}

const TabButton: React.StatelessComponent<Props & InjectedIntlProps> = ({
    label,
    icon,
    isSelected,
    onSelect,
    compact = true
}) => {
    return (
        <button
            tabIndex={0}
            role="tab"
            aria-selected={isSelected}
            onClick={onSelect}
            onKeyPress={onSelect}
            className={bem.classNames(bem.block, {
                [bem.modifier('selected')]: isSelected,
                [bem.modifier('compact')]: compact
            })}>
            <div className={bem.element('inner')}>
                {icon && <span className={bem.element('icon')}>{icon}</span>}
                <Normaltekst className={bem.element('label')}>{label}</Normaltekst>
            </div>
            <div className={bem.element('selector')} />
        </button>
    );
};

export default injectIntl(TabButton);
