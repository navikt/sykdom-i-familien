import React from 'react';

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps> = (props) => <div className="infosider">{props.children}</div>;

export default Layout;
