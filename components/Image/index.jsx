import Image from 'next/image';

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const Image = () => {
  return {};
};

export default Image;
