import { contentType } from '../../constants/constants';
import { productFilterValue } from '../../constants/product';
import { Loader } from 'semantic-ui-react';
import ProductArchive from '../../container/ProductArchive';
import {
  getProductListByCatId,
  getCategories,
  getCategoryBySlug
} from '../../api/product';
import {
  getProductAttributes,
  getProductAttrTerms
} from '../../api/ProductAttributes';
import { useRouter } from 'next/router';

const ProductCategory = (props) => {
  const { category, products, attribures } = props;
  const router = useRouter();
  if (router.isFallback) {
    return <Loader active inline="centered" />;
  }

  return (
    <ProductArchive
      products={products}
      type={contentType.PRODUCT}
      category={category}
      isCategory={true}
      router={router}
      attribures={attribures}
    />
  );
};

export default ProductCategory;

export async function getStaticPaths() {
  const categories = await getCategories({
    per_page: 2,
    hide_empty: true
  });

  let paths = categories.map((cat) => ({
    params: {
      slug: cat.slug
    }
  }));

  return {
    paths: paths,
    fallback: 'blocking' // can also be true or 'blocking'
  };
}

export async function getStaticProps(ctx) {
  const { params, locales, locale } = ctx;

  const category = await getCategoryBySlug(params.slug);

  if (category.statusCode === 404) {
    return {
      notFound: true
    };
  }

  const productList = await getProductListByCatId(category.data[0].id, {
    ...productFilterValue
  });

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
      category: category.data[0],
      products: productList,
      attribures: prdAttrWithTerms
    },
    revalidate: 10
  };
}
