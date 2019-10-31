import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import bemUtils from '../../../../../utils/bemUtils';
import './frontpagePoster.less';

interface Props {
    title: string;
    illustration: React.ReactNode;
}

const bem = bemUtils('frontpagePoster');

const FrontpagePoster: React.FunctionComponent<Props> = ({ title, illustration, children }) => {
    return (
        <div className={bem.block}>
            <div className={bem.element('contentWrapper')}>
                <div className={bem.element('text')}>
                    <Sidetittel className={bem.element('title')}>{title}</Sidetittel>
                    <div className={bem.element('content')}>{children}</div>
                </div>
                <div className={bem.element('illustration')} role="presentation">
                    {illustration}
                </div>
            </div>
        </div>
    );
};

export default FrontpagePoster;
