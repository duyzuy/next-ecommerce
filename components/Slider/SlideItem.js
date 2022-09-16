import Link from 'next/link';
import Image from 'next/image';
const SlideItem = ({ name, path, thumbnail, spacing }) => {
  return (
    <li className="ec__slide--item" style={{ marginRight: `${spacing}px` }}>
      <Link href={path}>
        <a className="ec__slide--link">
          {thumbnail !== '' && (
            <Image
              src={thumbnail}
              alt={name}
              width={40}
              height={40}
              className="ec__slide--thumbnail"
            />
          )}
          {name}
        </a>
      </Link>
    </li>
  );
};

export default SlideItem;
