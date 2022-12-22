import { contentType } from '../../constants/constants';
import { productFilterKeys, productFilterValue } from '../../constants/product';
import { isEmpty, isExists } from '../../utils/helper';
import { getProductList } from '../../api/product';
import ProductArchive from '../../container/ProductArchive';
import { useRouter } from 'next/router';
import {
  getProductAttributes,
  getProductAttrTerms
} from '../../api/ProductAttributes';
const Product = (props) => {
  const { products, attribures } = props;

  const router = useRouter();
  return (
    <ProductArchive
      products={products}
      type={contentType.PRODUCT}
      router={router}
      attribures={attribures}
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

  // const prdIds = Promise.all();
  const prdAttributes = await getProductAttributes();

  const prdAttrWithTerms = await Promise.all(
    prdAttributes.map(async (attr) => {
      return await getProductAttrTerms(attr.id).then((response) => {
        return {
          ...attr,
          attrTerms: response
        };
      });
    })
  );

  return {
    props: {
      products: products,
      attribures: prdAttrWithTerms
    }
  };
}
