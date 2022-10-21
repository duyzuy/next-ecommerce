import { useEffect, useState } from 'react';

const getMobileDetect = (userAgent) => {
  const isAndroid = () => Boolean(userAgent.match(/Android/i));
  const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
  const isWindows = () => Boolean(userAgent.match(/IEMobile/i));
  const isSSR = () => Boolean(userAgent.match(/SSR/i));
  const isMobile = () =>
    Boolean(isAndroid() || isIos() || isOpera() || isWindows());
  const isDesktop = () => Boolean(!isMobile() && !isSSR());
  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR
  };
};
const useDevice = () => {
  // const [device, setDevice] = useState({});
  // const userAgent =
  //   typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  // useEffect(() => {
  //   const detect = getMobileDetect(userAgent);

  //   setDevice({
  //     ...detect
  //   });
  // }, []);
  // console.log(device);
  const userAgent =
    typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  return getMobileDetect(userAgent);
};

export default useDevice;
