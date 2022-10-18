import Header from './common/Header';
import Footer from './common/Footer';

const Layout = (props) => {
  const { categories } = props;

  return (
    <>
      <Header categories={categories} />
      <main id="main" className="ec_main">
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
