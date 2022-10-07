import { contentType } from '../../constants/constants';
import { queryParams, defaultValue } from '../../constants/product';
import { isEmpty, isExists } from '../../utils/helper';

import ProductArchive from '../../container/ProductArchive';
import { getProductByCategory } from '../../api/product';
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

  const data = await getProductByCategory(query.slug, { ...queryObject });

  return {
    props: { category: data.category, products: data.products }
  };
}
