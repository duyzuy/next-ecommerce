import { AppProvider, StoreProvider } from '../providers';
import { getCategories } from '../api/product';

import { SessionProvider } from 'next-auth/react';
import BookingRoute from '../components/BookingRoute';
import Auth from '../components/Auth';
import Layout from '../components/Layout';
import { getVerticalMenuItem } from '../api/menu';
import { DeviceType } from '../model';

import { AppContext, AppProps } from 'next/app';
import { ReactNode } from 'react';
import type { NextPage } from 'next';
import { Session } from 'next-auth';
import 'react-loading-skeleton/dist/skeleton.css';
import 'semantic-ui-css/semantic.min.css';
import 'swiper/css/bundle';
import '../styles/global.scss';
import '../styles/grid.scss';
import '../lib/toast/style.scss';
import { CategoryItemType } from '../model/category';
type ComponentType = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
  auth?: boolean;
  booking?: boolean;
};
type AppPropsType = AppProps & {
  Component: ComponentType;
  appData?: {
    categories: CategoryItemType[];
    device: DeviceType;
  };
  pageProps: {
    session?: Session;
  };
};

const MyApp = (props: AppPropsType) => {
  const { Component, pageProps, appData } = props;
  const { device, ...rest } = appData;

  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => (
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
};

MyApp.getInitialProps = async (context: AppContext) => {
  let categories = [];
  let device: DeviceType = {
    isMobile: false,
    isDesktop: false,
    isAndroid: false,
    isIos: false
  };

  const { ctx } = context;
  const response = await getCategories({
    per_page: 20,
    hide_empty: true
  });
  // const menuItem = await getVerticalMenuItem();
  // console.log({ menuItem });
  if (response.status === 500) {
    console.log(response);
    // context.context.res.writeHead(500, {
    //   Location: 'http://localhost:3000/500',
    //   'Content-Type': 'text/html; charset=utf-8'
    // });
    // context.context.res.end();
  } else {
    categories = response.data;
  }

  const userAgent = ctx.req.headers['user-agent'];
  const isAndroid = Boolean(userAgent.match(/Android/i));
  const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const isOpera = Boolean(userAgent.match(/Opera Mini/i));

  const isMobile = isAndroid || isIos || isOpera;
  device = {
    isMobile,
    isDesktop: !isMobile,
    isAndroid,
    isIos
  };
  // 'primary' => __( 'Main Menu', 'saigonhomekitchen' ),
  //   'vertical' => __( 'vertical Menu', 'saigonhomekitchen' ),
  //   'primary_mobile' => __( 'Main Menu - Mobile', 'saigonhomekitchen' ),
  //   'footer' => __( 'Footer Menu', 'saigonhomekitchen' ),
  //   'top_bar_nav' => __( 'Top Bar Menu', 'saigonhomekitchen' ),

  return {
    appData: {
      categories,
      device
    }
  };
};

export default MyApp;
