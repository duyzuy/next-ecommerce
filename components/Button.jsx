import { useMemo } from 'react';
import Link from 'next/link';

const Button = (props) => {
  const {
    name,
    type = 'button',
    onClick,
    children,
    color,
    fluid,
    outline,
    href = '/',
    icon,
    iconPosition,
    className = '',
    size = 'small' || 'medium' || 'large',
    ...rest
  } = props;
  const classes = useMemo(() => {
    let clss = 'ec__button';
    if (color === 'primary') {
      clss = clss.concat(' ', 'primary');
    }
    if (color === 'light') {
      clss = clss.concat(' ', 'light');
    }
    if (color === 'dark') {
      clss = clss.concat(' ', 'dark');
    }

    if (color === 'secondary') {
      clss = clss.concat(' ', 'secondary');
    }

    if (fluid !== undefined) {
      clss = clss.concat(' ', 'fluid');
    }

    if (outline !== undefined) {
      clss = clss.concat(' ', 'outline');
    }

    if (type === 'link') {
      clss = clss.concat(' ', 'link');
    }
    if (iconPosition === 'right') {
      clss = clss.concat(' ', 'icon-right');
    }
    if (className) {
      clss = clss.concat(' ', className);
    }
    if (size !== undefined) {
      clss = clss.concat(' ', size);
    }
    return clss;
  }, [color, fluid, outline, type, iconPosition]);

  const IconComp = () => {
    if (icon !== undefined && typeof icon === 'function') {
      return <span className="icon">{icon()}</span>;
    }
    return <></>;
  };

  if (type === 'link') {
    return (
      <>
        <Link href={href} {...rest}>
          <a className={classes}>
            {iconPosition === 'right' ? (
              <>
                {children}
                <IconComp />
              </>
            ) : (
              <>
                <IconComp />
                {children}
              </>
            )}
          </a>
        </Link>
      </>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {iconPosition === 'right' ? (
        <>
          {children}
          <IconComp />
        </>
      ) : (
        <>
          <IconComp />
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
