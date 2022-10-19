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
import { productQueryParam } from '../../constants/queryParams';
import Breadcrumb from '../../components/BreadCrumb';
import SEO from '../../components/common/Seo';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
const ProductArchive = (props) => {
  const { products, isCategory, category, router } = props;

  const [filter, setFilter] = useState(defaultValue);

  const { query } = router;
  const { breadItems } = useBreadcrumb(router);

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

  const breadcrumbs = useMemo(() => {
    if (isCategory) {
      return [
        ...breadItems,
        {
          id: 'productCat',
          path: `/product-cat/${category?.slug}`,
          name: category?.name
        }
      ];
    }
    return breadItems;
  }, [breadItems, category]);
  useEffect(() => {
    setIsLoading(false);
  }, [router.asPath]);
  return (
    <div className="layout has-sidebar">
      <SEO
        title={`${(isCategory && category?.name) || 'Bếp từ nhập khẩu'}`}
        description="bep tu nhap khau chinh hang"
      />
      <Breadcrumb items={breadcrumbs} />
      <div className="layout-container">
        <div className={styles.ec__product}>
          <Container>
            <div className="ec__product--header">
              <Header as="h1">
                {(isCategory && category?.name) || 'Sản phẩm'}
              </Header>
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
                  position="right"
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ProductArchive;
