import Image from 'next/image';

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const CustomImage = (props) => {
  const { alt, ...rest } = props || {};
  return <Image {...rest} alt={alt} />;
};

export default CustomImage;
