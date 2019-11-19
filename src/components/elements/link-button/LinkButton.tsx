import React from 'react';
import Lenke, { Props as LenkeProps } from 'nav-frontend-lenker';
import '../../../../node_modules/nav-frontend-knapper-style/src/index.less';
import './linkButton.less';

interface OwnProps {
    alignCenter: boolean;
}

type Props = OwnProps & LenkeProps;

const LinkButton: React.FunctionComponent<Props> = ({ alignCenter, ...rest }) => (
    <Lenke
        {...rest}
        className="knapp knapp--hoved linkButton"
        style={alignCenter ? { textAlign: 'center' } : undefined}
    />
);

export default LinkButton;
