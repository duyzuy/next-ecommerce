import { useState, useEffect } from 'react';
export const useDimensions = (myRef) => {
  const getDimensions = () => ({
    width: myRef.current.offsetWidth,
    scrollWidth: myRef.current.scrollWidth
  });

  const [dimensions, setDimensions] = useState({
    width: 0,
    scrollWidth: 0
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

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
