import * as React from 'react';
import classNames from 'classnames';
import { Collapse } from 'react-collapse';

import './collapsableContainer.less';

export interface Props {
    children: React.ReactNode;
    isOpen?: boolean;
    ariaLive?: 'assertive' | 'polite' | 'off';
    animated?: boolean;
    hasNestedCollapse?: boolean;
}

const CollapseContainer: React.StatelessComponent<Props> = ({
    children,
    animated = true,
    isOpen = false,
    ariaLive = 'off',
    hasNestedCollapse
}) => {
    const content = <div aria-live={ariaLive}>{isOpen ? <div>{children}</div> : <div />}</div>;
    if (!animated) {
        return content;
    }
    return (
        <Collapse
            isOpened={isOpen}
            springConfig={{ stiffness: 250, damping: 30 }}
            className={classNames('ekspanderbartInnhold', {
                'ekspanderbartInnhold--apen': isOpen
            })}
            hasNestedCollapse={hasNestedCollapse}>
            {content}
        </Collapse>
    );
};

export default CollapseContainer;
