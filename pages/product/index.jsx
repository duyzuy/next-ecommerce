import { client } from '../../api/client';
import SEO from '../../components/common/Seo';
import { Container, Header, Grid } from 'semantic-ui-react';
import styles from '../../styles/product.module.scss';
import Card from '../../components/Card';
import SideBar from '../../container/SideBar';
import Breadcrumb from '../../components/BreadCrumb';
import Pagination from '../../container/Pagination';
import { isEmpty, isExists } from '../../utils/helper';
import * as Icon from 'react-feather';
import { contentType } from '../../constants/constants';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import Input from '../../components/Input';
import { useLoading } from '../../hooks/useLoading';
const Product = (props) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const { products } = props;
  const router = useRouter();

  const { query } = router;
  const isLoading = useLoading(router);

  const currentPage = useMemo(() => {
    if (!isEmpty(query) && isExists(query, 'page')) {
      return Number(query['page']);
    }
    return 1;
  }, [query.page]);

  const onChangePage = (page, action) => {
    let path = '/product';
    if (page !== 1) {
      path = path + `?page=${page}`;
    }
    if (page === 1 && action === 'paginateClick') {
      path = path + `?page=1`;
    }
    setFirstLoad(false);
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
              <div className="ec__product--tools">
                <div className="tool-inner">
                  <div className="tool-filter">
                    <span className="ec__icon">
                      <Icon.Filter size={16} />
                    </span>
                    Lọc Sản phẩm
                  </div>
                  <div className="tool-sort desc">
                    <Input
                      asRadio
                      content="Giá từ cao - thấp"
                      icon={() => <Icon.ArrowDown size={10} />}
                      name="productPrice"
                      value="desc"
                      id="priceDesc"
                      onChange={() => {
                        console.log('change');
                      }}
                    />
                  </div>
                  <div className="tool-sort asc">
                    <Input
                      asRadio
                      content="Giá từ thấp - cao"
                      icon={() => <Icon.ArrowUp size={10} />}
                      id="priceAsc"
                      value="asc"
                      name="productPrice"
                    />
                  </div>
                </div>
              </div>
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
                firstLoad={firstLoad}
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
  let page = 1;
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  if (!isEmpty(query) && isExists(query, 'page')) {
    page = query['page'];
  }

  const response = await client(`/product`, {
    perPage: 24,
    page
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
