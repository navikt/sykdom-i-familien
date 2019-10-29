import React from 'react';
import classnames from 'classnames';
import './stickyMenu.less';

interface Props {}

const StickyMenu: React.StatelessComponent<Props> = ({ children }) => {
    return <div className={classnames('panel', 'stickyMenu')}>{children}</div>;
};

export default StickyMenu;
