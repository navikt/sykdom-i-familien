import Document, { Main, NextScript } from 'next/document';
import fetch from 'node-fetch';
import { decoratorFragments } from '../decorator/_fragments';
import { NAVDecoratorFragments } from '../types/NAVDecoratorFragments';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

interface Props {
  decoratorFragments: NAVDecoratorFragments;
}

async function getDecoratorFragments() {
  const decoratorUrl =
    'https://appres.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true';
  const response = await fetch(decoratorUrl);
  const body = await response.text();
  const { document } = new JSDOM(body).window;
  const decoratorFragments: NAVDecoratorFragments = {
    NAV_SCRIPTS: document.getElementById('scripts').innerHTML,
    NAV_STYLES: document.getElementById('styles').innerHTML,
    NAV_HEADING: document.getElementById('header-withmenu').innerHTML,
    NAV_FOOTER: document.getElementById('footer-withmenu').innerHTML,
    NAV_MENU_RESOURCES: document.getElementById('megamenu-resources').innerHTML
  };
  return decoratorFragments;
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const decoratorFragments = await getDecoratorFragments();
    return { ...initialProps, decoratorFragments };
  }

  render() {
    const {
      NAV_SCRIPTS = '',
      NAV_STYLES = '',
      NAV_FOOTER = '',
      NAV_HEADING = '',
      NAV_MENU_RESOURCES = ''
    } = this.props.decoratorFragments;
    return (
      <html lang="no">
        <head>
          <title>Sykt barn - www.nav.no</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Informasjon om ytelser en kan få ved sykt barn." />
          <meta property="og:title" content="Sykt barn - www.nav.no" />
          <meta property="og:description" content="Informasjon om ytelser en kan få ved sykt barn." />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="IE=11" />
          <meta name="google-site-verification" content="IGSCxmuLPRTAu8ukd7saAP-MwI6xaVn-QB0v8l2dEZw" />
          <div dangerouslySetInnerHTML={{ __html: NAV_SCRIPTS }} />
          <div dangerouslySetInnerHTML={{ __html: NAV_MENU_RESOURCES }} />
          <div dangerouslySetInnerHTML={{ __html: NAV_STYLES }} />
          <link rel="stylesheet" href="/_next/static/css/styles.chunk.css" />
        </head>
        <body>
          <div dangerouslySetInnerHTML={{ __html: NAV_HEADING }} />
          <div role="document">
            <Main />
            <NextScript />
          </div>
          <script type="text/javascript" src="/static/settings.js"></script>
          <div dangerouslySetInnerHTML={{ __html: NAV_FOOTER }} />
        </body>
      </html>
    );
  }
}

export default MyDocument;
