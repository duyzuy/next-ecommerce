import React, { memo, useMemo } from 'react';

const CategoryButton = ({ className, label, icon }) => {
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
      <div className="item">
        <IconComp />
        {label && <p className="label">{label}</p>}
      </div>
    </div>
  );
};
export default memo(CategoryButton);
