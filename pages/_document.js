import Document, { Html, Head, Main, NextScript } from 'next/document';
import { useRouter } from 'next/router'
import { ServerStyleSheet } from 'styled-components';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    const page = this.props.__NEXT_DATA__.page;
    return (
      <Html>
        <Head>
          <link
            rel="icon"
            href="/assets/favicon.png"
            type="image/png"
            sizes="16x16"
          />
          <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900" rel="stylesheet"/>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700"
            rel="stylesheet"
            async
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/react-instantsearch-theme-algolia@4.0.0/style.min.css"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
            integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
            crossOrigin=""
            async
          />
                
       </Head>
        <body>
          <Main />
          <NextScript />          
          {/* {page.includes('/excel') && <script id="office-js" type="text/javascript" src="https://appsforoffice.microsoft.com/lib/1/hosted/office.js"></script>} */}
          {/* {page.includes('/excel') && <script id="functions-js" type="text/javascript" src="/scripts/functions.js"></script>} */}
          
          {/* {page.includes('/excel') && <script src="https://appsforoffice.microsoft.com/lib/1.1/hosted/custom-functions-runtime.js" type="text/javascript"></script> } */}
        </body>
      </Html>
    );
  }
}
