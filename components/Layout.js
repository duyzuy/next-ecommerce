import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import useClasses from '../hooks/useClasses';
import Header from './common/Header';
import Footer from './common/Footer';

const DynamicHeader = dynamic(() => import('./common/Header'), {
  suspense: true,
  loading: undefined
});

const DynamicFooter = dynamic(() => import('./common/Footer'), {
  suspense: true,
  loading: undefined
});

const Layout = (props) => {
  const { categories, device } = props;

  const clss = useClasses();

  // return (
  //   <>
  //     <Suspense fallback={`loading...`}>
  //       <DynamicHeader categories={categories} />
  //     </Suspense>
  //     <main id="main" className={`ec_main ${clss}`}>
  //       {props.children}
  //     </main>
  //     <Suspense fallback={`loading...`}>
  //       <DynamicFooter />
  //     </Suspense>
  //   </>
  // );

  return (
    <>
      <Header categories={categories} />
      <main id="main" className={`ec_main ${clss}`}>
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
