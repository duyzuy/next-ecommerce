import { contentType } from '../../constants/constants';
import { queryParams, defaultValue } from '../../constants/product';
import { isEmpty, isExists } from '../../utils/helper';

import ProductArchive from '../../container/ProductArchive';
import { getProductByCategory, getCategories } from '../../api/product';
import { useRouter } from 'next/router';

const ProductCategory = (props) => {
  const { category, products } = props;
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <ProductArchive
      products={products}
      type={contentType.PRODUCT}
      category={category}
      isCategory={true}
      router={router}
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
    fallback: true // can also be true or 'blocking'
  };
}

export async function getStaticProps(ctx) {
  const { params, locales, locale } = ctx;

  const data = await getProductByCategory(params.slug, { ...defaultValue });

  return {
    props: { category: data.category, products: data.products },
    revalidate: 10
  };
}

// export async function getServerSideProps(ctx) {
//   const { query, req, res } = ctx;

//   let queryObject = {};
//   Object.keys(queryParams).forEach((key) => {
//     Object.assign(queryObject, {
//       [queryParams[key]]: isExists(query, queryParams[key])
//         ? query[queryParams[key]]
//         : defaultValue[queryParams[key]]
//     });
//   });

//   const data = await getProductByCategory(query.slug, { ...queryObject });

//   return {
//     props: { category: data.category, products: data.products }
//   };
// }
