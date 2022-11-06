import { useEffect, useRef, useState } from 'react';
import { formatPrice } from '../helpers/product';
const controlType = {
  MIN: 'min',
  MAX: 'max'
};
const SliderRange = (props) => {
  const { min, max, onRange } = props;
  const [rangeVal, setRangeVal] = useState({ min, max });
  const sliderRef = useRef();
  const minRef = useRef();
  const maxRef = useRef();
  const barRef = useRef();
  const onMouseDown = (e, type) => {
    let shiftX = 0;
    if (type === controlType.MIN) {
      shiftX = e.clientX - minRef.current.getBoundingClientRect().left;
    }

    if (type === controlType.MAX) {
      shiftX = e.clientX - maxRef.current.getBoundingClientRect().left;
    }

    const onMouseMove = (e) => {
      const newLeft =
        e.clientX - shiftX - sliderRef.current.getBoundingClientRect().left;

      const sliderWidth = sliderRef.current.clientWidth;

      if (
        type === controlType.MIN &&
        newLeft > maxRef.current.offsetLeft - maxRef.current.offsetWidth
      ) {
        newLeft = minRef.current.offsetLeft;
      }
      if (
        type === controlType.MAX &&
        newLeft < minRef.current.offsetLeft + minRef.current.offsetWidth
      ) {
        newLeft = maxRef.current.offsetLeft;
      }
      if (newLeft < 0) {
        newLeft = 0;
      }
      const maxSlide = sliderWidth - minRef.current.offsetWidth;
      if (newLeft > maxSlide) {
        newLeft = maxSlide;
      }

      const newRangeVal =
        (Math.round(
          ((type === controlType.MAX
            ? newLeft + maxRef.current.clientWidth
            : newLeft) /
            sliderWidth) *
            100
        ) *
          max) /
        100;
      setRangeVal((prevState) => ({
        ...prevState,
        [type]: newRangeVal
      }));
      if (type === controlType.MIN) {
        minRef.current.style.left = `${newLeft}px`;
        barRef.current.style.left = `${
          newLeft + minRef.current.clientWidth / 2
        }px`;
      }
      if (type === controlType.MAX) {
        maxRef.current.style.left = `${newLeft}px`;
        barRef.current.style.right = `${
          sliderWidth - newLeft - maxRef.current.clientWidth / 2
        }px`;
      }
    };

    const onMouseUp = (e) => {
      onRange(rangeVal);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  useEffect(() => {
    onRange(rangeVal);
  }, [rangeVal]);
  return (
    <div className="range__wrapper">
      <div className="numbers">
        <span className="number">{formatPrice(rangeVal.min)}</span>
        <span className="number">{formatPrice(rangeVal.max)}</span>
      </div>

      <div className="slide__range" ref={sliderRef}>
        <div
          className="slide__range--control min"
          onMouseDown={(e) => onMouseDown(e, controlType.MIN)}
          onDragStart={() => {
            return false;
          }}
          ref={minRef}
        ></div>
        <div className="slide__range--bar" ref={barRef}></div>
        <div
          className="slide__range--control max"
          onMouseDown={(e) => onMouseDown(e, controlType.MAX)}
          ref={maxRef}
        ></div>
      </div>
    </div>
  );
};

export default SliderRange;
