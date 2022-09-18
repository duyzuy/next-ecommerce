import React, { useRef, useEffect, useState, useMemo } from 'react';
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
  PREV: 'prev',
  MAIN: 'main',
  SUB: 'sub'
};
const Slider = ({
  children,
  itemView = 1,
  itemSpacing = 10,
  itemScroll = 3,
  autoPlay = false,
  mode = 'main'
}) => {
  const sliderRef = useRef();
  const itemsRef = useRef();

  const [scrollAbleWidth, setScrollAbleWidth] = useState(0);
  const [slideItems, setSlideItems] = useState([]);
  const [itemWidth, setItemWidth] = useState(0);
  let subComponentList = Object.keys(Slider);
  // let itemScrollArr = createArray(itemScroll);
  let moveWidth = 0;
  let endNext = false;
  let endprev = true;
  let indexSlide = 1;

  let itemScrollArr = useMemo(() => {
    return createArray(itemScroll);
  }, []);

  useEffect(() => {
    setScrollAbleWidth(
      () => itemsRef.current.scrollWidth - itemsRef.current.clientWidth
    );

    setItemWidth(Math.round((100 * 100) / itemView) / 100);

    setSlideItems(itemsRef.current.childNodes);

    let timeInterval;
    autoPlay === true
      ? (timeInterval = setInterval(() => {
          moveSlide({ slideType: mode, action: slider.NEXT });
        }, 300000))
      : null;
    return () => {
      clearInterval(timeInterval);
    };
  }, [slideItems, itemView]);

  const moveSlide = ({ slideType, action }) => {
    let widthOfItems = 0;
    for (let i = 0; i < itemScrollArr.length; i++) {
      widthOfItems += Math.round(
        slideItems[itemScrollArr[i]].clientWidth +
          itemSpacing * (itemScroll - 1)
      );
    }
    // update next array of items
    itemScrollArr =
      action === slider.NEXT
        ? itemScrollArr.map((item) => item + itemScroll)
        : itemScrollArr.map((item) => item - itemScroll);
    action === slider.NEXT
      ? (moveWidth += widthOfItems)
      : (moveWidth -= widthOfItems);

    if (moveWidth > scrollAbleWidth) {
      moveWidth = scrollAbleWidth;
    }

    if (moveWidth < 0) {
      moveWidth = 0;
    }
    action === slider.NEXT ? indexSlide++ : indexSlide--;
    if (itemView === 1) {
    }
    itemsRef.current.style.transform = `translate3d(-${moveWidth}px, 0, 0)`;
  };

  const handleNext = () => {
    moveSlide({ slideType: mode, action: slider.NEXT });
  };

  const handlePrev = () => {
    if (indexSlide === 1) return;
    moveSlide({ slideType: mode, action: slider.PREV });
  };
  const Paginations = () => {
    return <>paginations</>;
  };
  return (
    <div
      className={`ec__slide ${
        mode === 'main' ? 'ec__slide--main' : 'ec__slide--sub'
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
                    mode,
                    itemView: itemView,
                    itemWidth: itemWidth
                  }
                };
                return newChild;
              }
              return null;
            })
          )}
        </ul>
      </div>
      {mode === 'main' && <Paginations />}
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
