import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react';
import SlideItem from './SlideItem';
import Paginations from './Paginations';
import SliderNav from './SliderNav';
import * as Icon from 'react-feather';
import { useDimensions } from '../../hooks/useDimensions';
import { makeArrayFromLength } from '../../utils/helper';

const slider = {
  NEXT: 'next',
  PREV: 'prev',
  GOTO: 'goto'
};
const Slider = ({
  asMain,
  children,
  autoPlay = false,
  dots = true,
  infinite = true,
  speed = 500,
  duration = 5000,
  slidesToShow = 1,
  slidesToScroll = 1,
  spacing = 10,
  breakPoint
}) => {
  let subComponentList = Object.keys(Slider);
  const sliderRef = useRef();
  const itemsRef = useRef();
  const timmerIdRef = useRef();
  const sliderDimensions = useDimensions(itemsRef);
  console.log(sliderDimensions);
  const [slideShow, setSlideShow] = useState({
    items: [],
    itemWidth: 0,
    currentIndex: [],
    transitionX: 0,
    slideIndex: 1,
    maxSlideIndex: 0
  });

  const moveSlide = useCallback(
    ({ action, indexGoto }) => {
      if (asMain !== undefined && slidesToScroll > slidesToShow)
        throw new Error('slidesToScroll must less than or equal slidesToShow');

      let widthOfItems = 0;

      if (asMain === undefined) {
        slideShow.currentIndex.forEach(
          (val) =>
            (widthOfItems +=
              Math.round(100 * slideShow.items[val].offsetWidth) / 100 +
              spacing)
        );
      } else {
        widthOfItems =
          (slideShow.itemWidth + spacing) * slideShow.slideToScroll;
      }

      //calculate with moveing

      let widthOfTransition = 0;

      if (asMain === undefined) {
        switch (action) {
          case slider.NEXT:
            {
              if (
                slideShow.transitionX + widthOfItems >
                sliderDimensions.scrollWidth - sliderDimensions.width
              ) {
                widthOfTransition =
                  sliderDimensions.scrollWidth - sliderDimensions.width;
              } else {
                widthOfTransition = slideShow.transitionX + widthOfItems;
              }
            }
            break;
          case slider.PREV:
            {
              if (slideShow.transitionX - widthOfItems < 0) {
                widthOfTransition = 0;
              } else {
                widthOfTransition = slideShow.transitionX - widthOfItems;
              }
            }
            break;
          default:
            widthOfTransition = 0;
        }
      } else {
        if (action === slider.NEXT) {
          if (
            slideShow.transitionX + widthOfItems >
            sliderDimensions.scrollWidth
          ) {
            widthOfTransition = 0;
          } else {
            widthOfTransition = slideShow.transitionX + widthOfItems;
          }
        }
        if (action === slider.PREV) {
          if (slideShow.transitionX >= sliderDimensions.width) {
            widthOfTransition = slideShow.transitionX - widthOfItems;
          } else {
            widthOfTransition = 0;
          }
        }
        if (action === slider.GOTO) {
          widthOfTransition = indexGoto * widthOfItems;
        }
      }

      // update new Current index items

      const newCurrenIntdex = slideShow.currentIndex.map((item, index) => {
        if (action === slider.NEXT) {
          if (item + slidesToScroll <= slideShow.items.length - 1) {
            return item + slidesToScroll;
          } else {
            return index;
          }
        }

        if (action === slider.PREV) {
          return item - slidesToScroll;
        }
        if (action === slider.GOTO) {
          return indexGoto + index;
        }
      });

      const slIndex =
        slideShow.slideIndex < slideShow.maxSlideIndex
          ? slideShow.slideIndex + 1
          : 0;

      setSlideShow((prevState) => ({
        ...prevState,
        currentIndex: newCurrenIntdex,
        transitionX: widthOfTransition,
        slideIndex: slIndex
      }));
    },
    [slideShow]
  );

  const onClickNext = () => {
    moveSlide({ action: slider.NEXT });
    clearTimeout(timmerIdRef.current);
  };

  const onClickPrev = () => {
    moveSlide({ action: slider.PREV });
    clearTimeout(timmerIdRef.current);
  };
  const onMoveSlide = (index) => {
    moveSlide({ action: slider.GOTO, indexGoto: index });
    clearTimeout(timmerIdRef.current);
  };

  useEffect(() => {
    let itemSlide = itemsRef.current.childNodes || [];
    let scrollWidth = 0;
    itemsRef?.current?.childNodes.forEach((item) => {
      console.log(item.offsetWidth, `1`);
      scrollWidth += item.offsetWidth + spacing;
    });
    // console.log(scrollWidth, spacing);
    let slToShow = slidesToShow,
      slToScroll = slidesToScroll,
      crIndex = makeArrayFromLength(slidesToScroll);

    if (breakPoint !== undefined) {
      if (sliderDimensions.width >= breakPoint.desktop.width) {
        slToShow = breakPoint.desktop.slideToShow || 1;
        slToScroll = breakPoint.desktop.slideToScroll || 1;
        crIndex = makeArrayFromLength(breakPoint.desktop.slideToScroll);
      }

      if (
        breakPoint.tablet.width <= sliderDimensions.width &&
        breakPoint.desktop.width >= sliderDimensions.width
      ) {
        slToShow = breakPoint.tablet.slideToShow || 1;
        slToScroll = breakPoint.tablet.slideToScroll || 1;
        crIndex = makeArrayFromLength(breakPoint.tablet.slideToScroll);
      }

      if (
        breakPoint.mobile.width <= sliderDimensions.width &&
        breakPoint.tablet.width >= sliderDimensions.width
      ) {
        slToShow = breakPoint.mobile.slideToShow || 1;
        slToScroll = breakPoint.mobile.slideToScroll || 1;
        crIndex = makeArrayFromLength(breakPoint.mobile.slideToScroll);
      }
      if (sliderDimensions.width <= breakPoint.mobile.width) {
        slToShow = breakPoint.mobile.slideToShow || 1;
        slToScroll = breakPoint.mobile.slideToScroll || 1;
        crIndex = makeArrayFromLength(breakPoint.mobile.slideToScroll);
      }
    }

    const widthOfItem =
      Math.round(
        (100 * (sliderDimensions.width - spacing * (slToShow - 1))) / slToShow
      ) / 100;

    const maxSlIndex = Math.round((itemSlide.length - slToShow) / slToScroll);
    setSlideShow((prevState) => ({
      ...prevState,
      itemWidth: widthOfItem,
      items: itemSlide,
      slideToShow: slToShow,
      slideToScroll: slToScroll,
      currentIndex: crIndex,
      maxSlideIndex: maxSlIndex
    }));
  }, [breakPoint, slidesToShow, slidesToScroll, sliderDimensions.width]);

  /**
   *
   * @params indexSlide, slideItems
   *
   * Set Auto Slider
   *
   */

  useEffect(() => {
    (autoPlay &&
      (timmerIdRef.current = setInterval(() => {
        moveSlide({ action: slider.NEXT });
      }, duration))) ||
      null;
    return () => {
      clearInterval(timmerIdRef.current);
    };
  }, [slideShow.items, slideShow.currentIndex, autoPlay, duration]);

  useEffect(() => {
    itemsRef.current.style.transform = `translate3d(-${slideShow.transitionX}px, 0, 0)`;
  }, [slideShow.currentIndex, sliderDimensions]);

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
                    spacing: spacing,
                    main: asMain,
                    itemView: slideShow.slideToShow,
                    itemWidth: slideShow.itemWidth,
                    active:
                      index === slideShow.currentIndex.includes(index)
                        ? true
                        : false
                  }
                };
                return newChild;
              }
              return null;
            })
          )}
        </ul>
      </div>
      {/* {asMain && pagination && (
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
      )} */}
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
const Pagination = ({ title, width, onMoveSlide }) => {
  return (
    <Paginations
      titles={title}
      onMoveSlide={onMoveSlide}
      pagiWidth={width}
      indexSlide={indexSlide}
    />
  );
};
Slider.Item = Item;

export default Slider;
