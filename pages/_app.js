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
import BookingRoute from '../components/BookingRoute';
function MyApp(props) {
  const { Component, pageProps, appData } = props;
  const { device, ...rest } = appData;
  console.log({ Component });
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <Layout {...rest} device={device}>
        {page}
      </Layout>
    ));

  const CustomComponent = (props) => {
    if (Component.auth) {
      return (
        <Auth auth={Component.auth}>
          <Component {...props} />
        </Auth>
      );
    }

    if (Component.booking) {
      return (
        <BookingRoute>
          <Component {...props} />
        </BookingRoute>
      );
    }
    return <Component {...props} />;
  };
  return (
    <StoreProvider>
      <SessionProvider session={pageProps?.session}>
        <AppProvider>
          {getLayout(<CustomComponent {...pageProps} />)}
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
