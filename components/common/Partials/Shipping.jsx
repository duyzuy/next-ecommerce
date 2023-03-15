import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';
const Notify = ({ className }) => {
  const clss = useMemo(() => {
    let cls = 'shipping';
    if (className) {
      cls = cls.concat(' ', className);
    }
    return cls;
  }, [className]);

  return (
    <div className={clss}>
      <Link href="/">
        <a className="item">
          <Icon.Truck size={20} />
        </a>
      </Link>
    </div>
  );
};
export default memo(Notify);
