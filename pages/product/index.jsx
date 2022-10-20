import { contentType } from '../../constants/constants';
import { queryParams, defaultValue } from '../../constants/product';
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

  let queryObject = {};
  Object.keys(queryParams).forEach((key) => {
    Object.assign(queryObject, {
      [queryParams[key]]: isExists(query, queryParams[key])
        ? query[queryParams[key]]
        : defaultValue[queryParams[key]]
    });
  });

  /**
   *
   * get data from woocommerce
   * @params
   *
   *
   */

  const products = await getProductList('products', {
    ...queryObject
  });

  console.log(products);
  return {
    props: {
      products: products,
      query: { ...queryObject }
    }
  };
}
