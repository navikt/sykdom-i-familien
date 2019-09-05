import React from 'react';

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps> = (props) => (
  <div className="page">
    <div className="contentWrapper">{props.children}</div>
  </div>
);

export default Layout;
