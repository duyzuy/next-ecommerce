import React, { memo, useMemo } from 'react';
import Link from 'next/link';
const Cart = ({ className, count, label, icon, showCount = false }) => {
  const clss = useMemo(() => {
    let cls = 'cart';
    if (className) {
      cls = cls.concat(' ', className);
    }
    return cls;
  }, [className]);

  const IconComp = () => {
    if (icon && typeof icon === 'function') {
      return <span className="ec_icon">{icon()}</span>;
    }
    return <></>;
  };
  return (
    <div className={clss}>
      <Link href="/cart">
        <a className="item">
          <IconComp />

          {(showCount && <span className="cart_count">{count}</span>) || <></>}
          {label && <p className="label">{label}</p>}
        </a>
      </Link>
    </div>
  );
};
export default memo(Cart);
