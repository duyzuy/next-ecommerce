import { ReactNode, useMemo } from 'react';
import Link from 'next/link';
import './button.module.scss';

const Button: React.FC<{
  name?: string;
  type?: 'button' | 'link';
  onClick?: () => void;
  children?: string;
  color?: 'primary' | 'light' | 'dark' | 'secondary';
  fluid?: boolean;
  outline?: boolean;
  iconPosition?: 'left' | 'right';
  href?: string;
  icon?: () => ReactNode;
  className?: string;
  size?: 'medium' | 'small';
}> = (props) => {
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
    size = 'medium',
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
    if (className !== undefined) {
      clss = clss.concat(' ', className);
    }
    if (size !== undefined) {
      clss = clss.concat(' ', size);
    }
    return clss;
  }, [color, fluid, outline, type, iconPosition, size, className]);
  const buttonTitle = name || children;

  if (type === 'link') {
    return (
      <Link href={href} {...rest}>
        <a className={classes}>
          <ComponentChild
            position={iconPosition}
            name={buttonTitle}
            icon={icon}
          />
        </a>
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      <ComponentChild position={iconPosition} name={buttonTitle} icon={icon} />
    </button>
  );
};

export default Button;

const ComponentChild: React.FC<{
  position?: string;
  name?: string;
  icon?: () => ReactNode;
}> = ({ position, name, icon }) => {
  if (icon !== undefined && typeof icon === 'function') {
    return (
      (position === 'right' && (
        <>
          {name}
          <span className="icon">{icon()}</span>
        </>
      )) || (
        <>
          <span className="icon">{icon()}</span>
          {name}
        </>
      )
    );
  }
  return <>{name}</>;
};
