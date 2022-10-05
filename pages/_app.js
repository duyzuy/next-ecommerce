import 'semantic-ui-css/semantic.min.css';
import '../styles/global.scss';
import AppProvider from '../providers/AppProvider';
import Layout from '../components/Layout';
import 'react-loading-skeleton/dist/skeleton.css';
import { getCategories } from '../api/product';
function MyApp({ Component, pageProps, appData }) {
  return (
    <AppProvider>
      <Layout {...appData}>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const categories = await getCategories('products/categories', {
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
