import AppProvider from '../providers/AppProvider';
import Layout from '../components/Layout';
import 'react-loading-skeleton/dist/skeleton.css';
import 'semantic-ui-css/semantic.min.css';
import '../styles/global.scss';
import 'swiper/css/bundle';
import { getCategories } from '../api/product';
function MyApp(props) {
  const { Component, pageProps, appData } = props;

  return (
    <AppProvider>
      <Layout {...appData}>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const categories = await getCategories({
    per_page: 20,
    hide_empty: true
  });

  return {
    appData: {
      categories: categories
    }
  };
};

export default MyApp;
