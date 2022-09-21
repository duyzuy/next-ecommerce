import Image from 'next/image';
import React from 'react';

const Container = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} style={{ overflowX: 'scroll', width: '500px' }}>
      {props.children}
    </div>
  );
});

const Example = () => {
  const lazyRoot = React.useRef(null);

  return (
    <Container ref={lazyRoot}>
      <Image
        lazyRoot={lazyRoot}
        src="/assets/images/image.svg"
        width="500"
        height="500"
      />
    </Container>
  );
};

export { Example };
