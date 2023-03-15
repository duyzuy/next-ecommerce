import React from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import useClasses from '../hooks/useClasses';
import Header from './common/Header';
import Footer from './common/Footer';
import { Toast } from '../lib/toast';
import NavigationBar from './common/NavigationBar';
const DynamicHeader = dynamic(() => import('./common/Header'), {
  suspense: true,
  loading: undefined
});

const DynamicFooter = dynamic(() => import('./common/Footer'), {
  suspense: true,
  loading: undefined
});

const Layout = (props) => {
  const { categories, device, children } = props;

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
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { device, categories });
    }
    return child;
  });

  return (
    <>
      <Header categories={categories} device={device} />
      <main id="main" className={`ec_main ${clss}`}>
        {childrenWithProps}
      </main>
      <Footer device={device} />
      {!device.isDesktop && <NavigationBar />}
      <Toast />
    </>
  );
};

export default Layout;
