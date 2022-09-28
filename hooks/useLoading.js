import { useEffect, useState } from 'react';

const useLoading = (router) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.asPath && setIsLoading(true);
    };
    const handleComplete = (url) => {
      console.log(url, router);
      url === router.asPath && setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.asPath]);

  return isLoading;
};

export { useLoading };
