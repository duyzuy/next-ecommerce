import Header from './common/Header';
import Footer from './common/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main id="main" className="ec_main">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
