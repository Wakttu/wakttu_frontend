import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { GoogleTagManager } from '@next/third-parties/google';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { GlobalStyle } from '@/styles/GlobalStyle';
import { Container } from '@/components';

import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import store from '@/redux/store';

import { fontSizeManager } from '@/modules/BaseFontSize';
import { isMobileDevice } from '@/modules/Mobile';

const App = ({ Component, pageProps }: AppProps) => {
  const { pathname: path } = useRouter();
  const queryClient = new QueryClient();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileChecker = () => {
      setIsMobile(isMobileDevice());
    };

    mobileChecker();
    window.addEventListener('resize', mobileChecker);

    if (!isMobile) {
      const resizeHandler = () => {
        fontSizeManager.handleResize();
      };

      resizeHandler();
      window.addEventListener('resize', resizeHandler);

      return () => {
        window.removeEventListener('resize', mobileChecker);
        window.removeEventListener('resize', resizeHandler);
      };
    }

    return () => {
      window.removeEventListener('resize', mobileChecker);
    };
  }, [isMobile]);

  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <Provider store={store}>
          <Head>
            <title>왁뚜 - 우리 모두 품어놀자!</title>
            <link rel="canonical" href={`https://www.wakttu.kr${path}`} />

            <meta name="robots" content={`${
              (path.includes('/main/') || path === '/') ? 'index' : 'noindex'
            },follow`} />
          </Head>

          <GlobalStyle />
          <Container path={path}>
            {isMobile ? (
              <h1>PC로 접속해 주세요.</h1>
            ) : (
              <Component {...pageProps} />
            )}
          </Container>

          <GoogleTagManager gtmId="GTM-PF5QTVJR" />
        </Provider>

        <ReactQueryDevtools initialIsOpen={false} />
      </CookiesProvider>
    </QueryClientProvider>
  );
};

export default App;
