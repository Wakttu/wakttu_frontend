import { Html, Head, Main, NextScript } from 'next/document';
import { extractCss } from 'goober';

const Document = () => {
  const css = extractCss();

  return (
    <Html lang="ko-kr" dir="ltr">
      <Head>
        <meta
          name="description"
          content="웹에서 즐길 수 있는 왁타버스 끝말잇기"
        />

        <meta name="og:title" content="왁뚜 - 우리 모두 품어놀자!" />
        <meta name="og:type" content="website" />
        <meta name="og:image" content="https://r2.wakttu.kr/og-image.png" />
        <meta
          name="og:description"
          content="웹에서 즐길 수 있는 왁타버스 끝말잇기"
        />
        <meta name="og:url" content="https://www.wakttu.kr" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="왁뚜 - 우리 모두 품어놀자!" />
        <meta
          name="twitter:description"
          content="웹에서 즐길 수 있는 왁타버스 끝말잇기"
        />
        <meta
          name="twitter:image"
          content="https://r2.wakttu.kr/og-image.png"
        />
        <meta name="twitter:domain" content="https://www.wakttu.kr" />

        <meta
          name="naver-site-verification"
          content="3d084ce50fc789d5fdcb94763a3be08cd50b00da"
        />

        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css"
        />

        <style
          id={'_goober'}
          // And defined it in here
          dangerouslySetInnerHTML={{ __html: ' ' + css }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
