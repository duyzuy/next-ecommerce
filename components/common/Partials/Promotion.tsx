import React, { memo, ReactNode, useMemo } from 'react';
import Link from 'next/link';
type PropsType = {
  className?: string;
  label?: string;
  icon?: () => ReactNode;
};
const Promotion: React.FC<PropsType> = ({ className, label, icon }) => {
  const clss = useMemo(() => {
    let cls = 'notify';
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
      <Link href="/khuyen-mai">
        <a className="item">
          <IconComp />
          {label && <p className="label">{label}</p>}
        </a>
      </Link>
    </div>
  );
};
export default memo(Promotion);
