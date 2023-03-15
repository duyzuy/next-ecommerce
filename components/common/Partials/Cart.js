import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';
const Cart = ({ className, count }) => {
  const clss = useMemo(() => {
    let cls = 'logo';
    if (className) {
      cls = cls.concat(' ', className);
    }
    return cls;
  }, [className]);

  return (
    <div className={clss}>
      <Link href="/cart">
        <a className="item">
          <Icon.ShoppingCart size={20} />
          <span className="cart_count">{count}</span>
        </a>
      </Link>
    </div>
  );
};
export default memo(Cart);
