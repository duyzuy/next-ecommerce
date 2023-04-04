import React, { useEffect, useState } from 'react';
enum Direction {
  UP = 'up',
  DOWN = 'down',
  DEFAULT = ''
}
export const useWindowScroll = (
  refElement: React.MutableRefObject<HTMLDivElement>
) => {
  const [dataView, setDataView] = useState<{
    direction: string;
    elementHeight: number;
    windowOffsetY: number;
    elementOffsetTop: number;
  }>({
    direction: '',
    windowOffsetY: 0,
    elementHeight: 0,
    elementOffsetTop: 0
  });
  let scrollValue = 0;

  useEffect(() => {
    let elementHeight = 0;
    let elementOffsetTop = 0;
    let direction = Direction.DEFAULT;

    if (refElement.current) {
      const targetEl = refElement.current;
      elementHeight = targetEl.clientHeight;
      elementOffsetTop = targetEl.offsetTop;
    }

    const onScroll: EventListener = (ev: Event) => {
      const windowScrollY = window.pageYOffset;

      if (windowScrollY > scrollValue) {
        direction = Direction.UP;
      } else {
        direction = Direction.DOWN;
      }

      scrollValue = windowScrollY;
      setDataView(() => ({
        direction,
        elementHeight,
        windowOffsetY: windowScrollY,
        elementOffsetTop: elementOffsetTop
      }));
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [refElement.current]);

  return dataView;
};
