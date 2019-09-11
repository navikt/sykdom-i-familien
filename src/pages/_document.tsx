import Document, { Main, NextScript, DocumentContext } from 'next/document';
import { decoratorFragments } from '../decorator/_fragments';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const transform = (App) => {
      return sheet.collectStyles(<App />);
    };
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      const page = ctx.renderPage(transform as any);

      return {
        ...page,
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    const {
      NAV_SCRIPTS = '',
      NAV_STYLES = '',
      NAV_FOOTER = '',
      NAV_HEADING = '',
      NAV_MENU_RESOURCES = ''
    } = decoratorFragments;
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
          {this.props.styles}
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
