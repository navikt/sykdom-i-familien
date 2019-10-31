import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import './strokeHeader.less';

const StrokeHeader: React.FunctionComponent<{}> = ({ children }) => (
    <div className="strokeHeader">
        <Undertittel>{children}</Undertittel>
    </div>
);

export default StrokeHeader;
