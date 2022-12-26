import { AppProvider } from '../providers';
import { StoreProvider } from '../providers';
import { getCategories } from '../api/product';
import Auth from '../components/Auth';
import Layout from '../components/Layout';
import 'react-loading-skeleton/dist/skeleton.css';
import 'semantic-ui-css/semantic.min.css';
import 'swiper/css/bundle';
import '../styles/global.scss';
import '../lib/toast/style.scss';
import { SessionProvider } from 'next-auth/react';

function MyApp(props) {
  const { Component, pageProps, appData } = props;
  const { device, ...rest } = appData;

  const getLayout =
    Component.getLayout ||
    ((page) => (
      <Layout {...rest} device={device}>
        {page}
      </Layout>
    ));

  return (
    <StoreProvider>
      <SessionProvider session={pageProps?.session}>
        <AppProvider>
          {Component.auth
            ? getLayout(
                <Auth auth={Component.auth}>
                  <Component {...pageProps} />
                </Auth>
              )
            : getLayout(<Component {...pageProps} />)}
        </AppProvider>
      </SessionProvider>
    </StoreProvider>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const categories = await getCategories({
    per_page: 20,
    hide_empty: true
  });
  // const UA = ctx.req.headers['user-agent'];

  return {
    appData: {
      categories: categories
    }
  };
};

export default MyApp;
