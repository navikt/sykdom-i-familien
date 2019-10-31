import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Link } from 'gatsby-plugin-intl';
import bemUtils from '../../../../../utils/bemUtils';

import './linkPanel.less';

type LinkPanelLayout = 'frontpageImageAbove' | 'wideWithImage' | 'plain';

interface Props {
    image?: React.ReactNode;
    title: string;
    url: string;
    layout?: LinkPanelLayout;
}

const bem = bemUtils('linkPanel');

const LinkPanel: React.FunctionComponent<Props> = ({ title, url, image, layout = 'frontpageImageAbove', children }) => {
    const includeChevron = layout === 'plain' || layout === 'wideWithImage';
    return (
        <div className={bem.block}>
            <Link tabIndex={0} to={url}>
                {image && <div className={bem.element('image')}>{image}</div>}
                <div className={bem.element('content')}>
                    <Undertittel className="title">{title}</Undertittel>
                    <div>{children}</div>
                </div>
                {includeChevron && (
                    <div className={bem.element('chevron')}>
                        <HoyreChevron />
                    </div>
                )}
            </Link>
        </div>
    );
};

export default LinkPanel;
