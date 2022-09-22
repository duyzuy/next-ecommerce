import React from 'react';

const Paginations = (props) => {
  const { titles, onMoveSlide, indexSlide, itemWidth } = props;

  console.log(itemWidth);
  const [dimension, setDimension] = React.useState({
    width: 0,
    scrollWidth: 0
  });
  const pagiItemRef = React.useRef();

  React.useEffect(() => {
    setDimension({
      width: pagiItemRef.current.offsetWidth,
      scrollWidth: pagiItemRef.current.scrollWidth
    });
  }, [pagiItemRef, indexSlide]);

  React.useEffect(() => {
    let moveWidth = Math.round((itemWidth + 10) * indexSlide);

    if (moveWidth > dimension.scrollWidth - dimension.width) {
      moveWidth = dimension.scrollWidth - dimension.width;
    }
    pagiItemRef.current.style.transform = `translate3d(-${moveWidth}px, 0, 0)`;
  }, [indexSlide]);

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