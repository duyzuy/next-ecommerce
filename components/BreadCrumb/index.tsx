import React from 'react';
import BreadItem from './BreadItem';
import { BreadcrumbItemType } from '../../model/common';
type PropsType = {
  items?: BreadcrumbItemType[];
};
const Breadcrumb: React.FC<PropsType> = (props) => {
  const { items } = props;
  const itemCount = items.length;

  return (
    <div className="breadcrumb">
      {items.map((item, index) => (
        <BreadItem
          key={index}
          href={item.path}
          name={item.name}
          isLast={itemCount - 1 === index}
          current={item?.current}
        />
      ))}
    </div>
  );
};
export default Breadcrumb;
