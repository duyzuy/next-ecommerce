import { contentType } from '../../constants/constants';
import { queryParams, defaultValue } from '../../constants/product';
import { isEmpty, isExists } from '../../utils/helper';

import { withlayout } from '../../HOCs/WithLayout';
import { getProductList } from '../../api/product';
import ProductArchive from '../../container/ProductArchive';
const Product = (props) => {
  const { products, productQuery } = props;

  return (
    <ProductArchive
      title="Sản phẩm"
      products={products}
      type={contentType.PRODUCT}
      productQuery={productQuery}
    />
  );
};

export default withlayout(Product, {
  title: 'San pham',
  meta: {
    title: 'Bep tu nhap khau',
    description: 'bep tu nhap khau chinh hang'
  },
  breadcrumbs: [
    { id: 'home', name: 'Trang chủ', href: '/' },
    { id: 'sanpham', name: 'Sản phẩm', href: '/product', current: true }
  ]
});

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
  return {
    props: {
      products: products,
      query: { ...queryObject }
    }
  };
}
