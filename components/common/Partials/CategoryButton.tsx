import React, { memo, useMemo } from 'react';
import { MenuItemType } from '../../../model';

type PropsType = {
  className?: string;
  label?: string;
  icon?: () => React.ReactNode;
  menuList?: MenuItemType[];
  onClick?: () => void;
};
const CategoryButton: React.FC<PropsType> = ({
  className,
  label,
  icon,
  onClick
}) => {
  const clss = useMemo(() => {
    let cls = 'category';
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
      <div className="item" onClick={onClick}>
        <IconComp />
        {label && <p className="label">{label}</p>}
      </div>
    </div>
  );
};
export default memo(CategoryButton);
