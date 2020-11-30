import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import bemUtils from '../../../../../utils/bemUtils';
import './pageBanner.less';

interface Props {
    title: string;
    illustration?: React.ReactNode;
}

const bem = bemUtils('pageBanner');

const PageBanner: React.FunctionComponent<Props> = ({ title, illustration, children }) => {
    return (
        <div
            className={bem.classNames(
                bem.block,
                bem.modifierConditional('noIllustration', illustration === undefined)
            )}>
            <div className={bem.element('borderBox')}>
                <div className={bem.element('contentWrapper')}>
                    <div className={bem.element('text')}>
                        <Sidetittel className={bem.element('title')}>{title}</Sidetittel>
                        <div className={bem.element('content')}>{children}</div>
                    </div>
                    {illustration && (
                        <div className={bem.element('illustration')} role="presentation" aria-hidden={true}>
                            {illustration}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PageBanner;
