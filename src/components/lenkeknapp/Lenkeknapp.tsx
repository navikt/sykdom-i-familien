import React, { ReactNode } from 'react';
import classnames from 'classnames';
import WithLink from '../with-link/WithLink';
import './lenkeknapp.less';

interface Props {
    url: string;
    type?: string;
    urlIsExternal?: boolean;
    children: ReactNode;
}

const Lenkeknapp = ({ url, urlIsExternal, type, children }: Props) => (
    <WithLink
        url={url}
        urlIsExternal={urlIsExternal}
        noStyling={true}
        className={classnames('knapp', 'lenkeknapp', `knapp--${type || 'standard'}`)}>
        <span>{children}</span>
    </WithLink>
);

export default Lenkeknapp;
