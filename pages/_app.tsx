import { AppProvider, StoreProvider } from '../providers';
import { getCategories } from '../api/product';

import { SessionProvider } from 'next-auth/react';
import BookingRoute from '../components/BookingRoute';
import Auth from '../components/Auth';
import Layout from '../components/Layout';
import { getVerticalMenuItem } from '../api/menu';
import { DeviceType } from '../model';
import { AppContext, AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { Session } from 'next-auth';
import 'react-loading-skeleton/dist/skeleton.css';
import 'semantic-ui-css/semantic.min.css';
import 'swiper/css/bundle';
import '../styles/global.scss';
import '../styles/grid.scss';
import '../lib/toast/style.scss';
import { CategoryItemType } from '../model/category';

type ComponentType<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: (page: JSX.Element) => JSX.Element;
  auth?: boolean;
  booking?: boolean;
};

type AppPropsType<P = {}> = AppProps<P> & {
  Component: ComponentType<P>;
  appData?: {
    categories?: CategoryItemType[];
    device?: DeviceType;
    ua?: string;
  };
  pageProps: {
    session?: Session;
  };
};

const MyApp = ({
  Component,
  pageProps,
  appData
}: AppPropsType<{ session: Session }>) => {
  const { device, ua, categories, ...rest } = appData;
  console.log({ categories });
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

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
        <AppProvider categories={categories} device={device}>
          {getLayout(<CustomComponent {...pageProps} />)}
        </AppProvider>
      </SessionProvider>
    </StoreProvider>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  let categories = [];
  let menus = [];
  let device = {
    isMobile: false,
    isDesktop: true,
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
  if (response.status === 200) {
    categories = response.data;
  } else {
    console.log(response);
    // context.context.res.writeHead(500, {
    //   Location: 'http://localhost:3000/500',
    //   'Content-Type': 'text/html; charset=utf-8'
    // });
    // context.context.res.end();
  }

  const userAgent = ctx.req.headers['user-agent'] || '';

  const isAndroid = Boolean(userAgent.match(/Android/i));
  const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const isOpera = Boolean(userAgent.match(/Opera Mini/i));

  const isMobile = isAndroid || isIos || isOpera;
  device = {
    ...device,
    isMobile: isMobile,
    isDesktop: !isMobile,
    isAndroid: isAndroid,
    isIos: isIos
  };

  return {
    appData: {
      categories,
      device
    }
  };
};

export default MyApp;
