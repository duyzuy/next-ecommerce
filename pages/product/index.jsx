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
import styles from '../../styles/product.module.scss';

const Product = (props) => {
  const { products } = props;
  const router = useRouter();
  const [filter, setFilter] = useState(defaultValue);
  const { query } = router;
  console.log(filter);
  const isLoading = useLoading(router);

  const currentPage = useMemo(() => {
    if (!isEmpty(query) && isExists(query, 'page')) {
      return Number(query['page']);
    }
    return 1;
  }, [query.page]);

  const onChangePage = (page) => {
    let path = '/product';
    path = path + `?page=${page}`;

    router.push(path);
  };
  const onFilter = (key, value) => {
    let path = '/product';
    setFilter((prevState) => {
      return {
        ...prevState,
        [key]: value
      };
    });
    path = `${path}?${key}=${value}`;
    router.push(path);
  };
  useEffect(() => {}, []);
  return (
    <>
      <SEO title="Bep tu nhap khau" description="bep tu nhap khau chinh hang" />
      <Breadcrumb
        items={[
          { id: 'home', name: 'Trang chu', href: '/' },
          { id: 'sanpham', name: 'San pham', href: '/product', current: true }
        ]}
      />
      <div className={styles.ec__product}>
        <Container>
          <div className="ec__product--header">
            <Header as="h1">Sản phẩm</Header>
          </div>
          <div className="ec__product--container">
            <SideBar type="category" />
            <div className="ec__product--list">
              <ProductToolBar onFilter={onFilter} filter={filter} />
              <div className="ec__product--items">
                <Grid columns={3}>
                  <Grid.Row>
                    {products.data.map((prd) => (
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
                totalPage={products.totalPage}
                totalItem={products.totalItem}
                current={currentPage}
                onChangePage={onChangePage}
                isLoading={isLoading}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Product;

export async function getServerSideProps(context) {
  const { query, res } = context;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  let queryObj = {};
  Object.keys(queryParams).forEach((key) => {
    queryObj = Object.assign(queryObj, {
      [queryParams[key]]: isExists(query, queryParams[key])
        ? query[queryParams[key]]
        : defaultValue[queryParams[key]]
    });
  });

  const response = await client
    .get(`/product`, {
      perPage: 24,
      ...queryObj
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: { products: response }
  };
}
