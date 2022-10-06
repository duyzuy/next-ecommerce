import { contentType } from '../../constants/constants';
import { queryParams, defaultValue } from '../../constants/product';
import { isEmpty, isExists } from '../../utils/helper';

import { getProductList, getCategory } from '../../api/product';
import ProductArchive from '../../container/ProductArchive';

const ProductCategory = (props) => {
  const { category, products } = props;

  return (
    <ProductArchive
      products={products}
      type={contentType.PRODUCT}
      category={category}
      isCategory={true}
    />
  );
};

export default ProductCategory;

export async function getServerSideProps(ctx) {
  const { query, req, res } = ctx;

  let queryObject = {};
  Object.keys(queryParams).forEach((key) => {
    Object.assign(queryObject, {
      [queryParams[key]]: isExists(query, queryParams[key])
        ? query[queryParams[key]]
        : defaultValue[queryParams[key]]
    });
  });

  const category = await getCategory('products/categories', {
    slug: query.slug
  });
  queryObject = {
    ...queryObject,
    category: category[0].id
  };
  const products = await getProductList('products', {
    ...queryObject
  });
  return {
    props: { category: category[0], products: products }
  };
}
