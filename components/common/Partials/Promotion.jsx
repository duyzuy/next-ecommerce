import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';
const Promotion = ({ className }) => {
  const clss = useMemo(() => {
    let cls = 'notify';
    if (className) {
      cls = cls.concat(' ', className);
    }
    return cls;
  }, [className]);

  return (
    <div className={clss}>
      <Link href="/khuyen-mai">
        <a>Khuyến mại</a>
      </Link>
    </div>
  );
};
export default memo(Promotion);
