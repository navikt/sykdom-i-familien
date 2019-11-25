import React from 'react';
import styles from '../../../styles';

interface Props {
    className?: string;
}

const PageContentWrapper: React.FunctionComponent<Props> = ({ className, children }) => (
    <div className={className} style={{ maxWidth: styles.size.maxWidth, margin: '0 auto', width: '100%' }}>
        {children}
    </div>
);

export default PageContentWrapper;
