import React from 'react';

import './printOnly.less';

interface Props {
    children: React.ReactNode;
    tag?: 'div' | 'span';
}

const PrintOnly: React.FunctionComponent<Props> = ({ tag = 'div', children }) => {
    if (tag === 'span') {
        return <span className="print-only">{children}</span>;
    }
    return <div className="print-only">{children}</div>;
};

export default PrintOnly;
