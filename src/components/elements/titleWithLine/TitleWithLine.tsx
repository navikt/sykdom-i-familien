import React from 'react';
import bemUtils from '../../../utils/bemUtils';
import { Systemtittel } from 'nav-frontend-typografi';

import './titleWithLine.less';
interface Props {
    title: string;
    tag?: string;
}

const bem = bemUtils('titleWithLine');

const TitleWithLine: React.FunctionComponent<Props> = ({ title, tag }) => (
    <div className={bem.block}>
        <Systemtittel tag={tag}>{title}</Systemtittel>
    </div>
);

export default TitleWithLine;
