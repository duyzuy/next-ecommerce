import 'semantic-ui-css/semantic.min.css';
import '../styles/global.scss';

import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
// MyApp.getInitialProps = async (ctx) => {
//   if (typeof window === 'undefined') {
//     // device detection is used to set up breakpoint for MyApp
//     // so DesignSystem uses this value in is prop
//     // then CSS is extracted in _document.js and added to HTML
//     // so MyApp is initially rendered for detected device.
//     const DeviceDetect = eval('require("node-device-detector")');
//     const device = new DeviceDetect();
//     const {
//       device: { type }
//     } = device.detect(ctx.ctx.req.headers['user-agent']);
//     const breakpoint = [
//       true,
//       type === 'tablet',
//       type === 'desktop'
//     ].lastIndexOf(true);

//     return {
//       breakpoint
//     };
//   }
// };

export default MyApp;
