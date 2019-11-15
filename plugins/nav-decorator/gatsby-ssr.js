import React from 'react';
import { decoratorFragments } from './fetched/_fragments';

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <head
      key="style"
      dangerouslySetInnerHTML={{ __html: `<style type="text/css">.topnav.container {display: none}; </style>` }}
    />,
    <head
      key="nav-head-1"
      dangerouslySetInnerHTML={{
        __html: `<link href="https://appres.nav.no/_public/shared/bilder/favicon.ico?_ts=151292348c8" rel="icon" type="image/x-icon">`
      }}
    />,
    <head
      key="nav-head-2"
      dangerouslySetInnerHTML={{
        __html: `<link href="https://appres.nav.no/_public/shared/bilder/favicon.ico?_ts=151292348c8" rel="shortcut icon" type="image/x-icon">`
      }}
    />,
    <head
      key="nav-head-3"
      dangerouslySetInnerHTML={{
        __html: `<link href="https://appres.nav.no/_public/appressurser/built-appres-v4/styles/css/app-decorator-v4.css?_ts=16b31863740" rel="stylesheet">`
      }}
    />,
    <head
      key="nav-head-4"
      dangerouslySetInnerHTML={{
        __html: `<link href="/css/bundle.css?e65e695b8b470a70eca6-27a65029e0b896aaa0e9-bundle" rel="stylesheet">`
      }}
    />,
    <head
      key="nav-head-5"
      dangerouslySetInnerHTML={{
        __html: `<link href="/css/bundle.css?4cdc919b13ff1c3a3a28-540808fd9207190d6aae-bundle&4cdc919b13ff1c3a3a28" rel="stylesheet">`
      }}
    />,
    <head
      key="nav-head-6"
      dangerouslySetInnerHTML={{
        __html: `<script>(function (h, o, t, j, a, r) {h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };h._hjSettings = { hjid: 148751, hjsv: 6 };a = o.getElementsByTagName('head')[0];r = o.createElement('script'); r.async = 1;r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;a.appendChild(r);})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');</script>`
      }}
    />,
    <head
      key="nav-head-6"
      dangerouslySetInnerHTML={{
        __html: `<link href="/css/bundle.css?f039847b05dae7b1f1cb-142f20381f5bfb9fee72-bundle&f039847b05dae7b1f1cb" rel="stylesheet">`
      }}
    />
  ]);
  // setHeadComponents([
  //   <head key="nav-styles" dangerouslySetInnerHTML={{ __html: decoratorFragments.NAV_STYLES }} />,
  //   <head key="nav-scripts" dangerouslySetInnerHTML={{ __html: decoratorFragments.NAV_SCRIPTS }} />,
  //   <head
  //     key="nav-resources"
  //     dangerouslySetInnerHTML={{
  //       __html: decoratorFragments.NAV_MENU_RESOURCES
  //     }}
  //   />
  // ]);
  setPreBodyComponents([
    <head key="nav-heading" dangerouslySetInnerHTML={{ __html: decoratorFragments.NAV_HEADING }} />
  ]);
  setPostBodyComponents([
    <head key="nav-footer" dangerouslySetInnerHTML={{ __html: decoratorFragments.NAV_FOOTER }} />
  ]);
};
