import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Roboto_Mono } from 'next/font/google'

const roboto = Roboto_Mono({
  weight: '500',
  subsets: ['latin'],
})

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>TermLife Insurance Premium Calculator</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: roboto.style.fontFamily,
          colorScheme: 'dark',
          primaryColor: 'red',
          // headings: {
          //   fontFamily: 'monospace, Roboto, sans-serif',
          // },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}