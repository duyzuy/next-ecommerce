import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useLayoutEffect
} from 'react';
import SlideItem from './SlideItem';

import * as Icon from 'react-feather';

const createArray = (length) => {
  if (typeof length !== 'number') return;
  return Array.from({ length }, (_, i) => {
    return i;
  });
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
  main
}) => {
  const sliderRef = useRef();
  const itemsRef = useRef();

  const [dimension, setDimensions] = useState({ width: 0, scrollWidth: 0 });
  const [slideItems, setSlideItems] = useState([]);
  const [itemWidth, setItemWidth] = useState(0);
  const [title, setTitle] = useState([{ name: '', current: false }]);
  const [maxIndexSlide, setMaxIndexSlide] = useState();
  let subComponentList = Object.keys(Slider);

  let moveWidth = 0;
  let indexSlide = 0;
  let sliding = false;
  let itemScrollArr = useMemo(() => {
    return createArray(itemScroll);
  }, []);

  const getDimensions = (myRef) => {
    return {
      width: myRef.current.offsetWidth,
      scrollWidth: myRef.current.scrollWidth
    };
  };

  useEffect(() => {
    setDimensions(getDimensions(itemsRef));
  }, [itemsRef]);

  let timeInterval;
  useEffect(() => {
    setItemWidth(Math.round((100 * 100) / itemView) / 100);

    setSlideItems(itemsRef.current.childNodes);

    setMaxIndexSlide(() => {
      return Math.round(
        (itemsRef.current.childNodes.length - itemView) / itemScroll
      );
    });

    //auto slider

    autoPlay === true
      ? (timeInterval = setInterval(() => {
          moveSlide({ action: slider.NEXT });
        }, 5000))
      : null;
    return () => {
      clearInterval(timeInterval);
    };
  }, [slideItems, itemView]);

  const moveSlide = ({ action }) => {
    if (sliding === true) {
      return;
    }

    if (main !== undefined && itemScroll > itemView)
      throw new Error('itemScroll must less than itemView');

    if (main !== undefined) {
      if (
        (action === slider.NEXT && indexSlide === maxIndexSlide) ||
        (action === slider.PREV && indexSlide === 0)
      )
        return;
    }

    if (main === undefined) {
      if (
        moveWidth === dimension.scrollWidth - dimension.width &&
        action === slider.NEXT
      ) {
        moveWidth = -moveWidth;
        itemScrollArr = createArray(itemScroll);
      }

      if (moveWidth === 0 && action === slider.PREV) {
        return;
      }
    }
    sliding = true;
    let widthOfItems = 0;
    for (let i = 0; i < itemScrollArr.length; i++) {
      widthOfItems +=
        Math.round(100 * slideItems[itemScrollArr[i]].offsetWidth) / 100;
    }
    widthOfItems = widthOfItems + itemSpacing * (itemScroll - 1);

    // update next array of items
    itemScrollArr =
      action === slider.NEXT
        ? itemScrollArr.map((item) => item + itemScroll)
        : itemScrollArr.map((item) => item - itemScroll);
    action === slider.NEXT
      ? (moveWidth += widthOfItems)
      : (moveWidth -= widthOfItems);

    if (main === undefined) {
      if (moveWidth > dimension.scrollWidth - dimension.width) {
        moveWidth = dimension.scrollWidth - dimension.width;
      }
      if (moveWidth < 0) {
        moveWidth = 0;
      }
    }

    action === slider.NEXT ? indexSlide++ : indexSlide--;

    itemsRef.current.style.transform = `translate3d(-${moveWidth}px, 0, 0)`;

    sliding = false;
  };

  const handleNext = () => {
    moveSlide({ action: slider.NEXT });
    clearInterval(timeInterval);
  };

  const handlePrev = () => {
    moveSlide({ action: slider.PREV });
    clearInterval(timeInterval);
  };

  const Paginations = ({ titles }) => {
    return (
      <div className="ec__slide--pagination">
        <ul className="pagination--items">
          {titles.map((title, index) => (
            <li key={index} className="pagination--item">
              <p className="sub--text">{title}</p>
            </li>
          ))}
        </ul>
      </div>
    );
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
            React.Children.map(children, (child) => {
              if (child.type.name === key) {
                const newChild = {
                  ...child,
                  props: {
                    ...child.props,
                    spacing: itemSpacing,
                    main,
                    itemView: itemView,
                    itemWidth: itemWidth
                  }
                };
                arrayTitle.push(child.props.name);
                return newChild;
              }
              return null;
            })
          )}
        </ul>
      </div>
      {main && <Paginations titles={arrayTitle} />}
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
