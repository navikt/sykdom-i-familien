import React from 'react';

import './screenOnly.less';

interface Props {
    children: React.ReactNode;
    tag?: 'div' | 'span';
}

const ScreenOnly: React.FunctionComponent<Props> = ({ tag = 'div', children }) => {
    if (tag === 'span') {
        return <span className="screen-only">{children}</span>;
    }
    return <div className="screen-only">{children}</div>;
};

export default ScreenOnly;
