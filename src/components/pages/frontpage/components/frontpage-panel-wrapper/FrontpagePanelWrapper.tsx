import React, { Children } from 'react';
import './frontpagePanelWrapper.less';
import bemUtils from '../../../../../utils/bemUtils';

interface Props {}

const bem = bemUtils('frontpagePanelWrapper');

const FrontpagePanelWrapper: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <div className={bem.block}>
            {Children.map(children, (child) => (
                <div className={bem.element('item')}>{child}</div>
            ))}
        </div>
    );
};
export default FrontpagePanelWrapper;
