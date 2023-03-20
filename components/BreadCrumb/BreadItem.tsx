import React from 'react';
import Link from 'next/link';
type PropsType = {
  href: string;
  name?: string;
  current?: boolean;
  isLast?: boolean;
};
const BreadItem: React.FC<PropsType> = ({ href, name, current, isLast }) => {
  return (
    <>
      {(current && (
        <span
          className="bread-item"
          dangerouslySetInnerHTML={{ __html: name }}
        ></span>
      )) || (
        <span className="bread-item">
          <Link href={href}>
            <a dangerouslySetInnerHTML={{ __html: name }}></a>
          </Link>
        </span>
      )}
      {!isLast && <span className="bread-space">/</span>}
    </>
  );
};
export default BreadItem;
