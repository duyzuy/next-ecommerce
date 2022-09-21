import { useState, useEffect } from 'react';
export const useDimensions = (myRef) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    scrollWidth: 0
  });

  const getDimensions = () => ({
    width: myRef.current.offsetWidth,
    scrollWidth: myRef.current.scrollWidth
  });
  const handleResize = () => {
    setDimensions(getDimensions());
  };
  useEffect(() => {
    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef]);

  return dimensions;
};
