import AppProvider from '../providers/AppProvider';
import { getCategories } from '../api/product';
import useDevice from '../hooks/useDevice';
import Layout from '../components/Layout';
import 'react-loading-skeleton/dist/skeleton.css';
import 'semantic-ui-css/semantic.min.css';
import 'swiper/css/bundle';
import '../styles/global.scss';

function MyApp(props) {
  const { Component, pageProps, appData } = props;
  const { device, ...rest } = appData;

  // const clientDetect = useDevice();
  // console.log(clientDetect);
  // if (Object.keys(clientDetect).length > 0) {
  //   console.log({
  //     SSR: clientDetect?.isSSR(),
  //     MB: clientDetect?.isMobile(),
  //     DESK: clientDetect?.isDesktop()
  //   });
  // }
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <Layout {...rest} device={device}>
        {page}
      </Layout>
    ));
  return <AppProvider>{getLayout(<Component {...pageProps} />)}</AppProvider>;
}

MyApp.getInitialProps = async (ctx) => {
  // const getMobileDetect = (userAgent) => {
  //   const isAndroid = () => Boolean(userAgent.match(/Android/i));
  //   const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  //   const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
  //   const isWindows = () => Boolean(userAgent.match(/IEMobile/i));
  //   const isSSR = () => Boolean(userAgent.match(/SSR/i));
  //   const isMobile = () =>
  //     Boolean(isAndroid() || isIos() || isOpera() || isWindows());
  //   const isDesktop = () => Boolean(!isMobile() && !isSSR());
  //   return {
  //     isMobile,
  //     isDesktop,
  //     isAndroid,
  //     isIos,
  //     isSSR
  //   };
  // };

  // const userAgent = ctx.ctx.req.headers['user-agent'];

  // const device = getMobileDetect(userAgent);

  const categories = await getCategories({
    per_page: 20,
    hide_empty: true
  });

  return {
    appData: {
      categories: categories
      // device: {
      //   isMobile: device.isMobile(),
      //   isAndroid: device.isAndroid(),
      //   isDesktop: device.isDesktop(),
      //   isIos: device.isIos(),
      //   isSSR: device.isSSR()
      // }
    }
  };
};

export default MyApp;
