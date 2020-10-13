import { Global } from '@emotion/core';
import { AppProps } from 'next/app';
import React from 'react';
import theme from 'theme';
import { ThemeProvider } from 'theme-ui';
import Head from 'next/head';
import Web3Provider from 'providers/Web3Provider';

const globalStyles = `
  html,
  body,
  body > div:first-of-type,
  div#__next {
    height: 100%;
    width: 100%;
  }

  div#__next {
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
  }

  html {
    overflow-x: hidden
  }
`;

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider {...{ theme }}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&family=Nunito+Sans:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Global styles={globalStyles} />
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </ThemeProvider>
  );
}

export default App;
