import React, { useRef, useEffect } from 'react';
import SlideItem from './SlideItem';
import * as Icon from 'react-feather';

const Slider = ({ children, itemView }) => {
  const sliderRef = useRef();
  const listRef = useRef();
  let subComponentList = Object.keys(Slider);

  const handleNext = () => {};

  const handlePrev = () => {};

  useEffect(() => {
    const sliderWidth = sliderRef.current.offsetWidth;
    const slideItems = listRef.current.childNodes;

    let sliderWrapWidth = 0;
    for (let item of slideItems) {
      sliderWrapWidth += item.offsetWidth;
    }

    console.log(listRef);
  }, []);
  return (
    <div className="ec__slide" ref={sliderRef}>
      <ul className="ec__slide--list" ref={listRef}>
        {subComponentList.map((key) => {
          return React.Children.map(children, (child) => {
            return child.type.name === key ? child : null;
          });
        })}
      </ul>
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
      name={props.name}
      path={props.path}
      thumbnail={props.thumbnail}
    />
  );
};

Slider.Item = Item;

export default Slider;
