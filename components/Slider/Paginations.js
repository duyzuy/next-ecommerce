import React from 'react';
import { useDimensions } from '../../hooks/useDimensions';

const Paginations = (props, ref) => {
  const { titles, onMoveSlide, spacing, pageViewItem } = props;
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [itemWidth, setItemWidth] = React.useState(0);
  // const [dimension, setDimension] = React.useState({
  //   width: 0,
  //   scrollWidth: 0
  // });
  const pagiItemRef = React.useRef();

  const pagiDimension = useDimensions(pagiItemRef);
  const getDimension = (myRef) => {
    return {
      width: myRef.current.offsetWidth,
      scrollWidth: myRef.current.scrollWidth
    };
  };
  // React.useEffect(() => {
  //   const handleResize = () => {
  //     setDimension(getDimension(pagiItemRef));
  //   };
  //   if (pagiItemRef) {
  //     setDimension(getDimension(pagiItemRef));
  //   }
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [pagiItemRef]);

  React.useEffect(() => {
    setItemWidth(
      (pagiDimension.width - spacing * (pageViewItem - 1)) / pageViewItem
    );
  }, [pagiItemRef, slideIndex, pagiDimension]);

  React.useEffect(() => {
    let moveWidth = Math.round(itemWidth * slideIndex + spacing * slideIndex);

    if (moveWidth > pagiDimension.scrollWidth - pagiDimension.width) {
      moveWidth = pagiDimension.scrollWidth - pagiDimension.width;
    }
    pagiItemRef.current.style.transform = `translate3d(-${moveWidth}px, 0, 0)`;
  }, [slideIndex, pagiDimension]);

  React.useImperativeHandle(ref, () => ({
    onMove: (indexItem) => {
      setSlideIndex(indexItem);
    }
  }));

  return (
    <div className="ec__slide--pagination">
      <ul className="pagination--items" ref={pagiItemRef}>
        {titles.map((title, index) => (
          <li
            key={index}
            index={index}
            className={
              title.active === true
                ? 'pagination--item active'
                : 'pagination--item'
            }
            style={{ minWidth: `${itemWidth}px` }}
            onClick={() => onMoveSlide(index)}
          >
            <p className="sub--text">{title.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.forwardRef(Paginations);
