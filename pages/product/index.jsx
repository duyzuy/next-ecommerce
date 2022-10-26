import { contentType } from '../../constants/constants';
import { productFilterKeys, productFilterValue } from '../../constants/product';
import { isEmpty, isExists } from '../../utils/helper';
import { getProductList } from '../../api/product';
import ProductArchive from '../../container/ProductArchive';
import { useRouter } from 'next/router';
const Product = (props) => {
  const { products } = props;

  const router = useRouter();
  return (
    <ProductArchive
      products={products}
      type={contentType.PRODUCT}
      router={router}
    />
  );
};

export default Product;

export async function getServerSideProps(ctx) {
  const { query, res, req } = ctx;

  res.setHeader(
    'Cache-Control',
    's-maxage=86400',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const products = await getProductList('products', {
    ...productFilterValue
  });

  return {
    props: {
      products: products
    }
  };
}
