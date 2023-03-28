import { contentType } from '../../constants/constants';
import { productFilterValue } from '../../constants/product';
import { Loader } from 'semantic-ui-react';
import {
  getProductListByCatId,
  getCategories,
  getCategoryBySlug,
  getProductIdsByCatId
} from '../../api/product';
import {
  getProductAttributes,
  getProductAttrTerms
} from '../../api/ProductAttributes';
import { useRouter } from 'next/router';
import Layout from '../../container/Layout';

import {
  ProductAttributeType,
  CategoryItemType,
  ProductsType
} from '../../model';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

type NextPagePropsType = {
  category: CategoryItemType;
  products: ProductsType;
  attribures: ProductAttributeType[];
};
const ProductCategory: NextPage<NextPagePropsType> = (props) => {
  const { category, products, attribures } = props;
  const router = useRouter();
  if (router.isFallback) {
    return <Loader active inline="centered" />;
  }

  return (
    <Layout
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

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getCategories({
    per_page: 24,
    hide_empty: true
  });
  let paths = [];
  if (response.status === 200) {
    paths = response.data?.map((cat) => ({
      params: {
        slug: cat.slug
      }
    }));
  }

  return {
    paths: paths,
    fallback: 'blocking' // can also be true or 'blocking'
  };
};
interface Params extends ParsedUrlQuery {
  slug: string;
}
export const getStaticProps: GetStaticProps<NextPagePropsType, Params> = async (
  ctx
) => {
  const { params, locales, locale } = ctx;
  const { slug } = ctx.params as Params;
  let attribures = [];
  let products = {
    totalPage: 0,
    totalItems: 0,
    page: 1,
    data: []
  };

  const category = await getCategoryBySlug(slug);

  if (category.statusCode === 404) {
    return {
      notFound: true
    };
  }

  const response = await getProductListByCatId(category.data[0].id, {
    ...productFilterValue
  });

  if (response.status === 200) {
    products = {
      totalPage: response.data.totalPage,
      totalItems: response.data.totalItems,
      page: response.data.page,
      data: response.data.products
    };
  }

  // let prdIdList = productList.data.map((prd) => prd.id);
  // for (let startPage = 2; startPage <= totalPage; startPage++) {
  //   const newFilter = {
  //     ...productFilterValue,
  //     page: startPage
  //   };
  //   const prdIds = await getProductIdsByCatId(category.data[0].id, {
  //     ...newFilter
  //   });

  //   prdIdList = prdIdList.concat(prdIds.data.map((prd) => prd.id));
  // }

  const prdAttributes = await getProductAttributes();
  if (prdAttributes.status === 200) {
    attribures = await Promise.all(
      prdAttributes.data.map(async (attr) => {
        return await getProductAttrTerms(attr.id).then((response) => {
          return {
            ...attr,
            attrTerms: response
          };
        });
      })
    );
  }

  return {
    props: {
      category: category.data[0],
      products,
      attribures
    },
    revalidate: 10
  };
};
