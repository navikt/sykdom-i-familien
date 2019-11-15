import React from 'react';
import { decoratorFragments } from './fetched/_fragments';

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <head key="nav-styles" dangerouslySetInnerHTML={{ __html: decoratorFragments.NAV_STYLES }} />,
    <head key="nav-scripts" dangerouslySetInnerHTML={{ __html: decoratorFragments.NAV_SCRIPTS }} />,
    <head
      key="hotjar"
      dangerouslySetInnerHTML={{
        __html: `
    <script>
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:148751,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    </script>`
      }}
    />,
    <head
      key="nav-resources"
      dangerouslySetInnerHTML={{
        __html: decoratorFragments.NAV_MENU_RESOURCES
      }}
    />
  ]);
  setPreBodyComponents([
    <head key="nav-heading" dangerouslySetInnerHTML={{ __html: decoratorFragments.NAV_HEADING }} />
  ]);
  setPostBodyComponents([
    <head key="nav-footer" dangerouslySetInnerHTML={{ __html: decoratorFragments.NAV_FOOTER }} />
  ]);
};
