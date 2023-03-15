import React, { memo, useMemo } from 'react';

import * as Icon from 'react-feather';

const CategoryButton = ({ className }) => {
  const clss = useMemo(() => {
    let cls = 'category';
    if (className) {
      cls = cls.concat(' ', className);
    }
    return cls;
  }, [className]);
  return (
    <div className={clss}>
      <span className="ec_icon">
        <Icon.Menu size={20} />
      </span>
      <span>Danh mục</span>
    </div>
  );
};
export default CategoryButton;
