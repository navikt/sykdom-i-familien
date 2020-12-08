import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import bemUtils from '../../../../../utils/bemUtils';
import './pageBannerCompact.less';

interface Props {
    title: string;
}

const bem = bemUtils('pageBannerCompact');

const PageBannerCompact: React.FunctionComponent<Props> = ({ title, children }) => {
    return (
        <div className={bem.classNames(bem.block)}>
            <Sidetittel className={bem.element('title')}>{title}</Sidetittel>
        </div>
    );
};

export default PageBannerCompact;
