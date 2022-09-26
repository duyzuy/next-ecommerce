import 'semantic-ui-css/semantic.min.css';
import '../styles/global.scss';
import AppProvider from '../providers/AppProvider';
import Layout from '../components/Layout';
import 'react-loading-skeleton/dist/skeleton.css';
function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

// MyApp.getInitialProps = (ctx) => {
//   console.log(ctx);
//   return {
//     appData: {
//       lang: 'vi'
//     }
//   };
// };

export default MyApp;
