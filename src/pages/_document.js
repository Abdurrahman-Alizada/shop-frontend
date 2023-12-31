import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta
            property="og:title"
            content="Naginay - Handmade jewelry Shop"
          />
          <meta property="og:type" content="eCommerce Website" />
          <meta
            property="og:description"
            content="Naginay - Handmade jewelry Shop"
          />
          <meta
            property="og:url"
            content="https://naginay.shop/"
          />
          <meta
            property="og:image"
            content="https://naginay.shop/logo/logo-light-2.svg"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
