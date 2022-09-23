import React, { useState, useEffect } from 'react';
const useDynamicBreakPoint = (breakPoint, wrapper) => {
  const [sliderView, setSliderView] = useState({});

  useEffect(() => {
    if (breakPoint !== undefined) {
      if (wrapper.width >= breakPoint?.desktop?.width) {
        setSliderView({
          itemView: breakPoint.desktop?.itemView,
          itemScroll: breakPoint.desktop?.itemScroll
        });
      }
      if (
        wrapper.width <= breakPoint?.desktop?.width &&
        wrapper.width >= breakPoint?.tablet?.width
      ) {
        setSliderView({
          itemView: breakPoint.tablet?.itemView,
          itemScroll: breakPoint.tablet?.itemScroll
        });
      }
      if (
        wrapper.width <= breakPoint?.tablet?.width &&
        wrapper.width >= breakPoint?.mobile?.width
      ) {
        setSliderView({
          itemView: breakPoint.mobile?.itemView,
          itemScroll: breakPoint.mobile?.itemScroll
        });
      }
      if (wrapper.width <= breakPoint?.mobile?.width) {
        setSliderView({
          itemView: breakPoint.mobile?.itemView,
          itemScroll: breakPoint.mobile?.itemScroll
        });
      }
    }
  }, [wrapper]);

  return {
    sliderView
  };
};

export { useDynamicBreakPoint };
