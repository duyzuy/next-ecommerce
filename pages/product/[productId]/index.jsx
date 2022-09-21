import { useRouter } from 'next/router';

const ProductDetail = () => {
  const router = useRouter();
  console.log(router);
  return <>this is product detail</>;
};

export default ProductDetail;
