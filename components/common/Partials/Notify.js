import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';
const Notify = ({ className }) => {
  const clss = useMemo(() => {
    let cls = 'notify';
    if (className) {
      cls = cls.concat(' ', className);
    }
    return cls;
  }, [className]);

  return (
    <div className={clss}>
      <Link href="/">
        <a className="item">
          <Icon.Bell size={20} />
        </a>
      </Link>
    </div>
  );
};
export default memo(Notify);
