import "@mantine/core/styles.css";
import 'nprogress/nprogress.css';

import Head from "next/head";
import NProgress from 'nprogress';
import { MantineProvider } from "@mantine/core";
import { theme, variantColorResolver } from "#assets/theme";
import Router from "next/router";

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider theme={{ ...theme, variantColorResolver }} defaultColorScheme="dark">
      <Head>
        <title>Illuminati Strikes</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
