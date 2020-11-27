import React, { Children } from 'react';
import './frontpagePanelWrapper.less';
import bemUtils from '../../../../../utils/bemUtils';

interface Props {
    maxColumns?: number;
}

const bem = bemUtils('frontpagePanelWrapper');

const FrontpagePanelWrapper: React.FunctionComponent<Props> = ({ maxColumns = 3, children }) => {
    return (
        <div className={bem.classNames(bem.block, bem.modifier(`columns-${maxColumns}`))}>
            {Children.map(children, (child) => (
                <div className={bem.element('item')}>{child}</div>
            ))}
        </div>
    );
};
export default FrontpagePanelWrapper;
