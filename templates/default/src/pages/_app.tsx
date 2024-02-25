import Head from 'next/head';
import { AppContext, AppProps } from 'next/app';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';
import Layout from 'components/Layout/Index';
import { IWEBSITE_SETTINGS } from 'types';

import 'styles/globals.scss';

gsap.registerPlugin(ScrollTrigger, SplitText);

type I_APP_PROPS = AppProps & {
  websiteSettings: IWEBSITE_SETTINGS;
};

const MyApp = ({ Component, pageProps, websiteSettings }: I_APP_PROPS) => {
  return (
    <>
      <Head>
        <title>{websiteSettings.title}</title>
        <meta name="description" content="portal" />
        <meta name="theme-color" content={websiteSettings.themeColor} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, maximum-scale=5, user-scalable=yes, width=device-width"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;

MyApp.getInitialProps = async ({
  Component,
  router,
  ctx,
}: AppContext): Promise<any> => {
  const locale = router.locale;
  const pageContext = { ...ctx, locale };
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(pageContext)
    : {};

  const websiteSettings: IWEBSITE_SETTINGS = {
    title: 'Brink App',
    themeColor: '#fff',
  };

  return { pageProps, websiteSettings };
};
