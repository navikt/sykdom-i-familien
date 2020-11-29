import React from 'react';
import sites from '../../build-utils/sites';
import { decoratorFragments } from './fetched/_fragments_sykdom-i-familien';
import { decoratorFragments as decoratorFragments_arbeidsgiver } from './fetched/_fragments_arbeidsgiver';
import { decoratorFragments as decoratorFragments_samarbeid } from './fetched/_fragments_samarbeidspartner';

const getFragmentsForPath = (pathname = '') => {
  if (pathname.indexOf(sites.arbeidsgiver.path) >= 0) {
    return decoratorFragments_arbeidsgiver;
  }
  if (pathname.indexOf(sites.samarbeid.path) >= 0) {
    return decoratorFragments_samarbeid;
  }
  return decoratorFragments;
};

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents, setPostBodyComponents, pathname }) => {
  const fragments = getFragmentsForPath(pathname);
  setHeadComponents([
    <head key="nav-styles" dangerouslySetInnerHTML={{ __html: fragments.NAV_STYLES }} />,
    <head key="nav-scripts" dangerouslySetInnerHTML={{ __html: fragments.NAV_SCRIPTS }} />,
    <head
      key="nav-resources"
      dangerouslySetInnerHTML={{
        __html: fragments.NAV_MENU_RESOURCES,
      }}
    />,
  ]);
  setPreBodyComponents([<head key="nav-heading" dangerouslySetInnerHTML={{ __html: fragments.NAV_HEADING }} />]);
  setPostBodyComponents([<head key="nav-footer" dangerouslySetInnerHTML={{ __html: fragments.NAV_FOOTER }} />]);
};
