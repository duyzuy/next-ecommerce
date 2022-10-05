import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Header, Grid } from 'semantic-ui-react';
import Card from '../../components/Card';
import SideBar from '../../container/SideBar';
import Pagination from '../../container/Pagination';
import ProductToolBar from '../ProductToolBar';
import { contentType } from '../../constants/constants';
import { queryParams, defaultValue } from '../../constants/product';
import { isEmpty, isExists } from '../../utils/helper';
import { updateQueryFromString } from '../../utils';
import styles from '../../styles/product.module.scss';

const ProductArchive = (props) => {
  const { products, productQuery } = props;
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
                        query={productQuery}
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

export default ProductArchive;
