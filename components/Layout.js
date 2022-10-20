import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// import Header from './common/Header';
// import Footer from './common/Footer';

const DynamicHeader = dynamic(() => import('./common/Header'), {
  suspense: true
});

const DynamicFooter = dynamic(() => import('./common/Footer'), {
  suspense: true
});
const loadingDynamic = () => {
  return 'loadinggggggggggg';
};
const Layout = (props) => {
  const { categories, device } = props;

  return (
    <Suspense fallback={loadingDynamic()}>
      <DynamicHeader categories={categories} />
      <main id="main" className="ec_main">
        {props.children}
      </main>
      <DynamicFooter />
    </Suspense>
  );

  // return (
  //   <>
  //     <Header categories={categories} />
  //     <main id="main" className="ec_main">
  //       <>{device}</>
  //       {props.children}
  //     </main>
  //     <Footer />
  //   </>
  // );
};

export default Layout;
