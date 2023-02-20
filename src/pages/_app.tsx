import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";

import "../styles/globals.css";
import '../styles/clouds.css';
import '../styles/animation.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>seatr</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="/favicon.png"
          rel="icon"
        />

      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
