import Header from './common/Header';
import Footer from './common/Footer';

const Layout = (props) => {
  const { categories, device } = props;

  return (
    <>
      <Header categories={categories} />
      <main id="main" className="ec_main">
        <>{device}</>
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
