import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';

const Paginations = (props, ref) => {
  const { titles, onMoveSlide, spacing, pageViewItem } = props;
  const [slideIndex, setSlideIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [dimension, setDimensions] = useState({ width: 0, scrollWidth: 0 });
  const pagiItemRef = useRef();

  const getDimensions = (myRef) => {
    return {
      width: myRef.current.offsetWidth,
      scrollWidth: myRef.current.scrollWidth
    };
  };

  useEffect(() => {
    setItemWidth(
      (pagiItemRef.current.offsetWidth - spacing * (pageViewItem - 1)) /
        pageViewItem
    );
    setDimensions(getDimensions(pagiItemRef));
  }, [pagiItemRef, slideIndex]);

  useEffect(() => {
    let moveWidth = Math.round(itemWidth * slideIndex + spacing * slideIndex);

    if (moveWidth > dimension.scrollWidth - dimension.width) {
      moveWidth = dimension.scrollWidth - dimension.width;
    }
    pagiItemRef.current.style.transform = `translate3d(-${moveWidth}px, 0, 0)`;
  }, [slideIndex]);

  useImperativeHandle(ref, () => ({
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

export default forwardRef(Paginations);
