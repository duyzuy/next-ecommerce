import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useLayoutEffect,
  useCallback
} from 'react';
import SlideItem from './SlideItem';

import * as Icon from 'react-feather';

const createArray = (length) => {
  if (typeof length !== 'number') return;
  return Array.from({ length }, (_, i) => {
    return i;
  });
};
const Paginations = ({ titles, width }) => {
  return (
    <div className="ec__slide--pagination">
      <ul className="pagination--items">
        {titles.map((title, index) => (
          <li
            key={index}
            className={
              title.active === true
                ? 'pagination--item active'
                : 'pagination--item'
            }
            style={{ minWidth: `${width}px` }}
          >
            <p className="sub--text">{title.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const slider = {
  NEXT: 'next',
  PREV: 'prev'
};
const Slider = ({
  children,
  itemView = 1,
  itemSpacing = 10,
  itemScroll = 1,
  autoPlay,
  main,
  duration = 5000
}) => {
  const sliderRef = useRef();
  const itemsRef = useRef();

  const [dimension, setDimensions] = useState({ width: 0, scrollWidth: 0 });
  const [slideItems, setSlideItems] = useState([]);
  const [itemWidth, setItemWidth] = useState(0);
  const [title, setTitle] = useState([{ name: '', current: false }]);
  const [maxIndexSlide, setMaxIndexSlide] = useState();
  let subComponentList = Object.keys(Slider);
  const [indexSlide, setIndexSlide] = useState(0);
  const [moveWidth, setMoveWidth] = useState(0);
  const [sliding, setSliding] = useState(false);

  const [itemScrollArr, setItemScrollArr] = useState(() => {
    return createArray(itemScroll);
  });

  const getDimensions = (myRef) => {
    return {
      width: myRef.current.offsetWidth,
      scrollWidth: myRef.current.scrollWidth
    };
  };

  useEffect(() => {
    setDimensions(getDimensions(itemsRef));
    setSlideItems(itemsRef.current.childNodes);
    setMaxIndexSlide(() => {
      return Math.round(
        (itemsRef.current.childNodes.length - itemView) / itemScroll
      );
    });
    setItemWidth(Math.round((100 * 100) / itemView) / 100);
  }, [itemView]);

  /**
   *
   * @params indexSlide, slideItems
   *
   * Set Auto Slider
   *
   */
  let timmerId;
  useEffect(() => {
    autoPlay === true
      ? (timmerId = setTimeout(() => {
          moveSlide({ action: slider.NEXT });
        }, duration))
      : null;
    return () => {
      clearTimeout(timmerId);
    };
  }, [slideItems, indexSlide]);

  const moveSlide = ({ action }) => {
    if (sliding === true) return;
    setSliding(true);
    if (main !== undefined && itemScroll > itemView)
      throw new Error('itemScroll must less than itemView');

    let widthOfItems = 0;

    for (let i = 0; i < itemScrollArr.length; i++) {
      widthOfItems +=
        Math.round(100 * slideItems[itemScrollArr[i]].offsetWidth) / 100;
    }
    widthOfItems = widthOfItems + itemSpacing * (itemScroll - 1);

    // update next array of items

    setItemScrollArr((prevState) =>
      prevState.map((item) =>
        action === slider.NEXT ? item + itemScroll : item - itemScroll
      )
    );

    setMoveWidth((prevState) => {
      let moveWidth = 0;
      if (main === undefined) {
        switch (action) {
          case slider.NEXT:
            {
              if (
                prevState + widthOfItems >
                dimension.scrollWidth - dimension.width
              ) {
                moveWidth = dimension.scrollWidth - dimension.width;
              } else {
                moveWidth = prevState + widthOfItems;
              }
            }
            break;
          case slider.PREV:
            {
              if (prevState + widthOfItems < 0) {
                moveWidth = 0;
              } else {
                moveWidth = prevState + widthOfItems;
              }
            }
            break;
          default:
            moveWidth = 0;
        }
      } else {
        if (action === slider.NEXT) {
          moveWidth = prevState + dimension.width;
        } else {
          if (prevState >= dimension.width) {
            moveWidth = prevState - dimension.width;
          } else {
            moveWidth = 0;
          }
        }
      }

      return moveWidth;
    });

    setIndexSlide((prevState) => {
      return action === slider.NEXT ? prevState + 1 : prevState - 1;
    });
    console.log(indexSlide, moveWidth, dimension);
    /**
     *
     * reset slider main
     *
     */
    if (main !== undefined) {
      if (
        (action === slider.NEXT && indexSlide === maxIndexSlide) ||
        (action === slider.PREV && indexSlide === 0)
      ) {
        setIndexSlide(0);
        setMoveWidth(0);
        setItemScrollArr(createArray(itemScroll));
      }
    }
    /**
     *
     * reset slider
     *
     */
    if (main === undefined) {
      if (
        (moveWidth === dimension.scrollWidth - dimension.width &&
          action === slider.NEXT) ||
        (moveWidth === 0 && action === slider.PREV)
      ) {
        setMoveWidth(0);
        setItemScrollArr(createArray(itemScroll));
      }

      if (
        (action === slider.NEXT && indexSlide === maxIndexSlide) ||
        (indexSlide <= 0 && action === slider.PREV)
      ) {
        setIndexSlide(0);
      }
    }

    itemsRef.current.style.transform = `translate3d(-${moveWidth}px, 0, 0)`;

    setSliding(false);
  };

  const handleNext = () => {
    moveSlide({ action: slider.NEXT });
    clearTimeout(timmerId);
  };

  const handlePrev = () => {
    moveSlide({ action: slider.PREV });
    clearTimeout(timmerId);
  };

  let arrayTitle = [];

  return (
    <div
      className={`ec__slide ${
        main !== undefined ? 'ec__slide--main' : 'ec__slide--sub'
      }`}
      ref={sliderRef}
    >
      <div className="ec__slide--list">
        <ul className="ec__slide--items" ref={itemsRef}>
          {subComponentList.map((key) =>
            React.Children.map(children, (child, index) => {
              if (child.type.name === key) {
                const newChild = {
                  ...child,
                  props: {
                    ...child.props,
                    spacing: itemSpacing,
                    main,
                    itemView: itemView,
                    itemWidth: itemWidth,
                    active: index === indexSlide ? true : false
                  }
                };
                arrayTitle.push({
                  name: child.props.name,
                  active: index === indexSlide ? true : false
                });
                return newChild;
              }
              return null;
            })
          )}
        </ul>
      </div>
      {main && <Paginations titles={arrayTitle} width={dimension.width / 4} />}
      <div className="ec__slide--nav">
        <span className="ec__slide--prev" onClick={handlePrev}>
          <Icon.ArrowLeft width={16} />
        </span>
        <span className="ec__slide--next" onClick={handleNext}>
          <Icon.ArrowRight width={16} />
        </span>
      </div>
    </div>
  );
};

const Item = (props) => {
  return <SlideItem {...props} />;
};

Slider.Item = Item;

export default Slider;
