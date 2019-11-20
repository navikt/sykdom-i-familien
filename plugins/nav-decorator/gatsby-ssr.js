import React from 'react';
import { decoratorFragments } from './fetched/_fragments';

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <head key="nav-styles" dangerouslySetInnerHTML={{ __html: decoratorFragments.NAV_STYLES }} />,
    <head key="nav-scripts" dangerouslySetInnerHTML={{ __html: decoratorFragments.NAV_SCRIPTS }} />,
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
