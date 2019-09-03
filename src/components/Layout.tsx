import React from 'react';

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps> = (props) => (
    <div>
        <img src="/static/logo.png" />
        ---{props.children}---
    </div>
);

export default Layout;
