import * as React from 'react';
import NavFrontendChevron from 'nav-frontend-chevron';
import bemUtils from '../../../utils/bemUtils';

import './collapseToggler.less';

interface Props {
    children: React.ReactNode;
    onToggle: () => void;
    isOpen?: boolean;
}

const bem = bemUtils('collapseToggler');

const CollapseToggler: React.StatelessComponent<Props> = (props) => {
    const { isOpen = false, children, onToggle } = props;
    return (
        <button
            className={bem.block}
            onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
                evt.stopPropagation();
                evt.preventDefault();
                onToggle();
            }}
            aria-expanded={isOpen}>
            <span className={bem.element('content')}>
                <span className={bem.element('label')}>{children}</span>
                <span className={bem.element('chevron')}>
                    <NavFrontendChevron type={isOpen ? 'opp' : 'ned'} />
                </span>
            </span>
        </button>
    );
};
export default CollapseToggler;
