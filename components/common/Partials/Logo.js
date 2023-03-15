import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
const Logo = ({ className }) => {
  const clss = useMemo(() => {
    let cls = 'logo';
    if (className) {
      cls = cls.concat(' ', className);
    }
    return cls;
  }, [className]);
  return (
    <div className={clss}>
      <Link href="/">
        <a>
          <Image
            src="/assets/images/logo-saigonhome-original.svg"
            alt="logo"
            width={340}
            height={90}
            placeholder="blur"
            blurDataURL="/assets/images/logo-saigonhome-original.svg"
          />
        </a>
      </Link>
    </div>
  );
};
export default memo(Logo);
