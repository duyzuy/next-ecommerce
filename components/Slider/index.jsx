import React, { useRef, useEffect, useState, useCallback } from 'react';
import SlideItem from './SlideItem';
import Paginations from './Paginations';
import SliderNav from './SliderNav';
import * as Icon from 'react-feather';
import { useDimensions } from '../../hooks/useDimensions';

const createArray = (length) => {
  if (typeof length !== 'number') return;
  return Array.from({ length }, (_, i) => {
    return i;
  });
};

const slider = {
  NEXT: 'next',
  PREV: 'prev',
  GOTO: 'goto'
};
const Slider = ({
  children,
  itemView = 1,
  itemSpacing = 10,
  itemScroll = 1,
  autoPlay,
  asMain,
  duration = 5000,
  breakPoint,
  pagination,
  pageViewItem = 4
}) => {
  let subComponentList = Object.keys(Slider);
  const sliderRef = useRef();
  const itemsRef = useRef();
  const paginationRef = useRef();
  const [slideItems, setSlideItems] = useState([]);
  const [itemWidth, setItemWidth] = useState(0);
  const [maxIndexSlide, setMaxIndexSlide] = useState();
  const [indexSlide, setIndexSlide] = useState(0);
  const [moveWidth, setMoveWidth] = useState(0);
  const [itemScrollSlider, setItemScrollSlider] = useState(itemScroll);
  const [itemViewSlider, setItemViewSlider] = useState(itemView);
  const [itemScrollArr, setItemScrollArr] = useState(() => {
    return createArray(itemScroll);
  });
  const [breakPointSlider] = useState(breakPoint);
  const sliderDimensions = useDimensions(itemsRef);

  useEffect(() => {
    setSlideItems(itemsRef.current.childNodes);

    if (
      breakPoint !== undefined &&
      sliderDimensions.width >= breakPoint.desktop.width
    ) {
      setItemViewSlider(breakPoint.desktop.itemView);
      setItemScrollSlider(breakPoint.desktop.itemScroll);
      setItemScrollArr(() => {
        return createArray(breakPoint.desktop.itemScroll);
      });
    }

    if (
      breakPoint !== undefined &&
      breakPoint.tablet.width <= sliderDimensions.width &&
      breakPoint.desktop.width >= sliderDimensions.width
    ) {
      setItemViewSlider(() => {
        return breakPoint?.tablet?.itemView;
      });
      setItemScrollSlider(breakPoint?.tablet?.itemScroll);
      setItemScrollArr(() => {
        return createArray(breakPoint?.tablet?.itemScroll);
      });
    }

    if (
      breakPoint !== undefined &&
      breakPoint.mobile.width <= sliderDimensions.width &&
      breakPoint.tablet.width >= sliderDimensions.width
    ) {
      setItemViewSlider(breakPoint?.mobile?.itemView);
      setItemScrollSlider(breakPoint?.mobile?.itemScroll);
      setItemScrollArr(() => {
        return createArray(breakPoint?.mobile?.itemScroll);
      });
    }
    if (
      breakPoint !== undefined &&
      sliderDimensions.width <= breakPoint.mobile.width
    ) {
      setItemViewSlider(breakPoint?.mobile?.itemView);
      setItemScrollSlider(breakPoint?.mobile?.itemScroll);
      setItemScrollArr(() => {
        return createArray(breakPoint?.mobile?.itemScroll);
      });
    }

    setMoveWidth(() => {
      let widthOfItems = 0;

      if (asMain === undefined) {
        for (let i = 0; i < itemScrollArr.length; i++) {
          widthOfItems +=
            Math.round(
              100 * itemsRef.current.childNodes[itemScrollArr[i]].offsetWidth
            ) / 100;
        }
        widthOfItems = widthOfItems + itemSpacing * itemScrollSlider;
      } else {
        if (itemView > itemScrollSlider) {
          widthOfItems =
            itemWidth * itemScrollSlider + itemSpacing * itemScrollSlider;
        } else {
          widthOfItems =
            itemWidth * itemScrollSlider + itemSpacing * (itemScrollSlider - 1);
        }
      }
      return widthOfItems;
    });
  }, [itemView, itemScroll, sliderDimensions]);

  useEffect(() => {
    setItemWidth(() => {
      return (
        Math.round(
          (100 *
            (itemsRef.current.offsetWidth -
              (itemViewSlider - 1) * itemSpacing)) /
            itemViewSlider
        ) / 100
      );
    });
    setMaxIndexSlide(() => {
      return Math.round(
        (itemsRef.current.childNodes.length - itemViewSlider) / itemScrollSlider
      );
    });
  }, [itemViewSlider, sliderDimensions]);
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
      ? (timmerId = setInterval(() => {
          moveSlide({ action: slider.NEXT });
        }, duration))
      : null;
    return () => {
      clearInterval(timmerId);
    };
  }, [slideItems, indexSlide]);

  useEffect(() => {
    itemsRef.current.style.transform = `translate3d(-${moveWidth}px, 0, 0)`;
  }, [indexSlide, moveWidth, sliderDimensions]);

  const moveSlide = ({ action, indexGoto }) => {
    if (asMain !== undefined && itemScrollSlider > itemView)
      throw new Error('itemScroll must less than itemView');
    let widthOfItems = 0;

    if (asMain === undefined) {
      for (let i = 0; i < itemScrollArr.length; i++) {
        widthOfItems +=
          Math.round(100 * slideItems[itemScrollArr[i]].offsetWidth) / 100;
      }
      widthOfItems = widthOfItems + itemSpacing * itemScrollSlider;
    } else {
      if (itemView > itemScrollSlider) {
        widthOfItems =
          itemWidth * itemScrollSlider + itemSpacing * itemScrollSlider;
      } else {
        widthOfItems =
          itemWidth * itemScrollSlider + itemSpacing * (itemScrollSlider - 1);
      }
    }

    // update next array of items

    setItemScrollArr((prevState) =>
      prevState.map((item) => {
        if (action === slider.NEXT) {
          return item + itemScrollSlider;
        }

        if (action === slider.PREV) {
          return item - itemScrollSlider;
        }
        if (action === slider.GOTO) {
          return indexGoto;
        }
      })
    );

    setMoveWidth((prevState) => {
      let moveWidth = 0;
      if (asMain === undefined) {
        switch (action) {
          case slider.NEXT:
            {
              if (
                prevState + widthOfItems >
                sliderDimensions.scrollWidth - sliderDimensions.width
              ) {
                moveWidth =
                  sliderDimensions.scrollWidth - sliderDimensions.width;
              } else {
                moveWidth = prevState + widthOfItems;
              }
            }
            break;
          case slider.PREV:
            {
              if (prevState - widthOfItems < 0) {
                moveWidth = 0;
              } else {
                moveWidth = prevState - widthOfItems;
              }
            }
            break;
          default:
            moveWidth = 0;
        }
      } else {
        if (action === slider.NEXT) {
          moveWidth = prevState + widthOfItems;
        }
        if (action === slider.PREV) {
          if (prevState >= sliderDimensions.width) {
            moveWidth = prevState - widthOfItems;
          } else {
            moveWidth = 0;
          }
        }
        if (action === slider.GOTO) {
          moveWidth = indexGoto * widthOfItems;
        }
      }

      return moveWidth;
    });

    setIndexSlide((prevState) => {
      let newIndex = 0;

      switch (action) {
        case slider.NEXT: {
          newIndex = prevState + 1;
          break;
        }
        case slider.PREV: {
          newIndex = prevState - 1;
          break;
        }
        case slider.GOTO: {
          newIndex = indexGoto;
          break;
        }
        default:
          newIndex = 0;
      }

      return newIndex;
    });

    /**
     *
     * reset slider main
     *
     */
    if (asMain !== undefined) {
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
    if (asMain === undefined) {
      if (
        (moveWidth === sliderDimensions.scrollWidth - sliderDimensions.width &&
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
  };

  const onClickNext = () => {
    moveSlide({ action: slider.NEXT });
    clearTimeout(timmerId);
  };

  const onClickPrev = () => {
    moveSlide({ action: slider.PREV });
    clearTimeout(timmerId);
  };
  const onMoveSlide = (index) => {
    moveSlide({ action: slider.GOTO, indexGoto: index });
    clearTimeout(timmerId);
  };
  let titles = [];

  return (
    <div
      className={`ec__slide ${
        asMain !== undefined ? 'ec__slide--main' : 'ec__slide--sub'
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
                    main: asMain,
                    itemView: itemView,
                    itemWidth: itemWidth,
                    active: index === indexSlide ? true : false
                  }
                };
                titles.push({
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
      {asMain && pagination && (
        <Paginations
          titles={titles}
          onMoveSlide={onMoveSlide}
          itemWidth={
            Math.round(
              (100 * (sliderDimensions.width - 10 * (pageViewItem - 1))) /
                pageViewItem
            ) / 100
          }
          indexSlide={indexSlide}
        />
      )}
      <SliderNav
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
        iconPrev={() => {
          return <Icon.ArrowLeft width={16} />;
        }}
        iconNext={() => {
          return <Icon.ArrowRight width={16} />;
        }}
      />
    </div>
  );
};

const Item = (props) => {
  return <SlideItem {...props} />;
};

Slider.Item = Item;

export default Slider;
