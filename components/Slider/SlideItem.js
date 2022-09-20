import Link from 'next/link';
import Image from 'next/image';
const SlideItem = ({
  name,
  path,
  thumbnail,
  spacing,
  itemView,
  main,
  itemWidth,
  active,
  children,
  asChild
}) => {
  let itemStyles = {
    marginRight: itemView > 1 || main === undefined ? `${spacing}px` : 0
  };

  if (main !== undefined) {
    itemStyles = Object.assign(
      {
        minWidth: `${itemWidth}%`
      },
      itemStyles
    );
  }
  if (thumbnail === '') {
    thumbnail = 'assets/images/image.svg';
  }
  if (asChild) {
    return (
      <>
        <li
          className={
            active === true ? 'ec__slide--item active' : 'ec__slide--item'
          }
          style={{ ...itemStyles }}
        >
          {children}
        </li>
      </>
    );
  }
  return (
    <li
      className={active === true ? 'ec__slide--item active' : 'ec__slide--item'}
      style={{ ...itemStyles }}
    >
      <Link href={path}>
        <a className="ec__slide--link">
          <div className="ec__slide--thumbnail">
            <Image
              src={thumbnail}
              alt={name}
              layout="fill"
              className="ec__slide--thumbnail"
              priority
            />
          </div>
          <div className="ec__slide--text">
            <p className="sub--text">{name}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default SlideItem;
