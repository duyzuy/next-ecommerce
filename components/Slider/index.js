import React, { useRef, useEffect, useState } from 'react';
import SlideItem from './SlideItem';
import * as Icon from 'react-feather';

const createArray = (length) => {
  if (typeof length !== 'number') return;
  return Array.from({ length }, (_, i) => {
    return i;
  });
};

const Slider = ({
  children,
  itemView = 6,
  itemSpacing = 10,
  itemScroll = 3
}) => {
  const sliderRef = useRef();
  const itemsRef = useRef();

  const [scrollAbleWidth, setScrollAbleWidth] = useState(0);
  const [itemsArr, setItemArr] = useState(() => createArray(itemScroll));
  let subComponentList = Object.keys(Slider);

  useEffect(() => {
    setScrollAbleWidth(
      () => itemsRef.current.scrollWidth - itemsRef.current.offsetWidth
    );
  }, [scrollAbleWidth]);

  let itemScrollArr = createArray(itemScroll);
  let moveWidth = 0;
  let endNext = false;
  let endprev = true;
  const handleNext = () => {
    if (moveWidth > scrollAbleWidth) {
      moveWidth = scrollAbleWidth;
      endNext = true;
    } else {
      const slideItems = itemsRef.current.childNodes;
      itemScrollArr = itemScrollArr.map((item) => item + itemScroll);
      for (let i = 0; i < itemScrollArr.length; i++) {
        moveWidth +=
          slideItems[itemScrollArr[i]].offsetWidth +
          itemSpacing * (itemScroll - 1);
      }
    }

    // update next array of items

    //calculator total width from item in array scroll

    itemsRef.current.style.transform = `translateX(-${moveWidth}px)`;
    console.log(itemScrollArr);
  };
  // setItemArr(itemScrollArr);
  const handlePrev = () => {
    console.log(itemScrollArr);
    console.log(moveWidth, scrollAbleWidth);
    // if (moveWidth > scrollAbleWidth) return;

    // const slideItems = itemsRef.current.childNodes;

    // const lastItem = slideItems.length - 1;

    // // update next array of items
    // itemScrollArr = itemScrollArr.map((item) => item - itemScroll);

    // //calculator total width from item in array scroll

    // for (let i = 0; i < itemScrollArr.length; i++) {
    //   moveWidth +=
    //     slideItems[itemScrollArr[i]].offsetWidth +
    //     itemSpacing * (itemScroll - 1);
    // }
    // itemsRef.current.style.transform = `translateX(+${moveWidth}px)`;
  };

  return (
    <div className="ec__slide" ref={sliderRef}>
      <div className="ec__slide--list">
        <ul className="ec__slide--items" ref={itemsRef}>
          {subComponentList.map((key) =>
            React.Children.map(children, (child) => {
              if (child.type.name === key) {
                const newChild = {
                  ...child,
                  props: {
                    ...child.props,
                    spacing: itemSpacing
                  }
                };
                return newChild;
              }
              return null;
            })
          )}
        </ul>
      </div>
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
  return (
    <SlideItem
      spacing={props.spacing}
      name={props.name}
      path={props.path}
      thumbnail={props.thumbnail}
    />
  );
};

Slider.Item = Item;

export default Slider;
