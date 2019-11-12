import React from 'react';
import bemUtils from '../../../utils/bemUtils';
import chunk from 'lodash.chunk';

import './columns.less';

interface Props {
    items: object[];
    columns: number;
    itemRenderer: (item: object) => React.ReactNode;
}

const bem = bemUtils('columns');

const Columns: React.FunctionComponent<Props> = ({ items, columns = 2, itemRenderer }) => {
    const divideListAt = Math.round(items.length / columns);
    const dividedColumns = chunk(items, divideListAt);

    return (
        <div className={bem.classNames(bem.block, bem.modifier(`cols-${columns}`))}>
            {dividedColumns.map((col, index) => (
                <div key={index} className={bem.element('col')}>
                    {col.map((item) => itemRenderer(item))}
                </div>
            ))}
        </div>
    );
};

export default Columns;
