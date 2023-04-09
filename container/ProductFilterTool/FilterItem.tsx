import React, { useState } from 'react';
import * as Icon from 'react-feather';
import { isEmpty } from '../../utils/helper';
const FilterItem: React.FC<{
  attribute: { name: string; id: number };
  options: { id: number; name: string; slug: string; taxonomy: string }[];
}> = ({ attribute, options = [] }) => {
  const [isShow, setShow] = useState(false);
  const onShowFilterOptions = () => {};
  console.log({ attribute });
  if (isEmpty(options)) {
    return <></>;
  }
  return (
    <div key={`attr-${attribute.id}`} className="attr-item">
      <div className="attr-top" onClick={() => setShow((isShow) => !isShow)}>
        <span className="name">{attribute.name}</span>
        <span className="icon">
          <Icon.ArrowDown size={12} />
        </span>
      </div>
      {(isShow && (
        <div className="attr-options">
          {options.map((term, index) => {
            return (
              <div key={`term-${term.id}`} className="term-item">
                {term.name}
              </div>
            );
          })}
        </div>
      )) || <></>}
    </div>
  );
};
export default FilterItem;
