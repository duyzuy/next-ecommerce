import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Header, Grid } from 'semantic-ui-react';
import { client } from '../../api/client';
import SEO from '../../components/common/Seo';
import Card from '../../components/Card';
import Breadcrumb from '../../components/BreadCrumb';
import SideBar from '../../container/SideBar';
import Pagination from '../../container/Pagination';
import ProductToolBar from '../../container/ProductToolBar';
import { contentType } from '../../constants/constants';
import { queryParams, defaultValue } from '../../constants/product';
import { useLoading } from '../../hooks/useLoading';
import { isEmpty, isExists } from '../../utils/helper';
import { updateQueryFromString } from '../../utils';
import styles from '../../styles/product.module.scss';
import {
  productQueryParam,
  productQueryValue
} from '../../constants/queryParams';
import { withlayout } from '../../HOCs/WithLayout';
const Product = (props) => {
  const { products } = props;
  const router = useRouter();
  const [filter, setFilter] = useState(defaultValue);
  const { query } = router;

  const [isLoading, setIsLoading] = useState(false);
  const currentPage = useMemo(() => {
    if (!isEmpty(query) && isExists(query, 'page')) {
      return Number(query['page']);
    }
    return 1;
  }, [query]);

  const onChangePage = (page) => {
    onFilterChangeRoute(productQueryParam.PAGE, page);
  };
  const onFilterChangeRoute = (key, value) => {
    setIsLoading(true);
    let path = router.asPath;
    const newQueryString = updateQueryFromString(path, {
      key,
      value
    });

    setFilter((prevState) => {
      return {
        ...prevState,
        [key]: value
      };
    });
    path = `${path}?${key}=${value}`;
    router.push(newQueryString);
  };
  useEffect(() => {
    setIsLoading(false);
  }, [router.asPath]);
  return (
    <div className={styles.ec__product}>
      <Container>
        <div className="ec__product--header">
          <Header as="h1">Sản phẩm</Header>
        </div>
        <div className="ec__product--container">
          <SideBar type="category" />
          <div className="ec__product--list">
            <ProductToolBar
              onFilterChangeRoute={onFilterChangeRoute}
              filter={filter}
              isLoading={isLoading}
            />
            <div className="ec__product--items">
              <Grid columns={3}>
                <Grid.Row>
                  {products?.data?.map((prd) => (
                    <Grid.Column key={prd.id}>
                      <Card
                        type={contentType.PRODUCT}
                        data={prd}
                        isLoading={isLoading}
                      />
                    </Grid.Column>
                  ))}
                </Grid.Row>
              </Grid>
            </div>
            <Pagination
              type={contentType.PRODUCT}
              totalPage={products?.totalPage}
              totalItem={products?.totalItem}
              current={currentPage}
              onChangePage={onChangePage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </Container>
    </div>
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

  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // );
  let queryObject = {};
  Object.keys(queryParams).forEach((key) => {
    Object.assign(queryObject, {
      [queryParams[key]]: isExists(query, queryParams[key])
        ? query[queryParams[key]]
        : defaultValue[queryParams[key]]
    });
  });

  // const response = await client
  //   .get(`http://localhost:3000/api/product`, { ...queryObject })
  //   .then((res) => {
  //     return res;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const response = await fetch('http://localhost:3000/api/product')
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });

  return {
    props: {
      products: response
    }
  };
}
