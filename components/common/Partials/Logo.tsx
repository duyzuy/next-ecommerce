import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type PropsType = {
  className?: string;
  asIcon?: any;
  label?: string;
};
const Logo: React.FC<PropsType> = ({ className, asIcon, label }) => {
  const clss = useMemo(() => {
    let cls = 'logo';
    if (className) {
      cls = cls.concat(' ', className);
    }
    return cls;
  }, [className]);

  const IconComp = () => {
    if (asIcon) {
      return (
        <span className="ec_icon">
          <Image
            src="/assets/images/favicon-sgh-red.svg"
            alt="icon"
            width={100}
            height={100}
            placeholder="blur"
            blurDataURL="/assets/images/favicon-sgh-red.svg"
          />
        </span>
      );
    }
    return (
      <Image
        src="/assets/images/logo-saigonhome-original.svg"
        alt="logo"
        width={340}
        height={90}
        placeholder="blur"
        blurDataURL="/assets/images/logo-saigonhome-original.svg"
      />
    );
  };
  return (
    <div className={clss}>
      <Link href="/">
        <a className="item">
          <IconComp />
          {label && <p className="label">{label}</p>}
        </a>
      </Link>
    </div>
  );
};
export default memo(Logo);
