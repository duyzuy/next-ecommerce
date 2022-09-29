import Image from 'next/image';

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const CustomImage = (props) => {
  return <Image {...props} />;
};

export default CustomImage;
