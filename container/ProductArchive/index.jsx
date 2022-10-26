import { useEffect, useMemo, useState, useCallback } from 'react';
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
import { client } from '../../api/client';

const ProductArchive = (props) => {
  const { products, isCategory, category, router } = props;

  const [productData, setProductData] = useState(products.data);
  const [filter, setFilter] = useState(defaultValue);

  const { query } = router;
  const { breadItems } = useBreadcrumb(router);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = useMemo(() => {
    if (isCategory) {
      return {
        slug: category.slug
      };
    }
    return {};
  }, [category]);

  const handleSelection = (select) => {
    let queries = select.value.split('&');
    queries = queries.reduce((acm, item) => {
      setFilter((prevState) => ({
        ...prevState,
        [item.split('=')[0]]: item.split('=')[1]
      }));

      acm[item.split('=')[0]] = item.split('=')[1];

      return acm;
    }, {});

    handleFetchData({ params: { ...queries }, action: 'filter' });
  };

  const handleFetchData = async (data) => {
    const { params, action } = data;
    setIsLoading(true);

    //update filter
    let newFilter = Object.assign(filter, { ...params });

    if (isCategory) {
      newFilter = {
        ...newFilter,
        category: category.id
      };
    }

    const prds = await client.get(`/product`, {
      ...newFilter
    });
    setProductData(prds.data);
    setFilter(newFilter);

    console.log(newFilter);
    // onUpdateRoutePath(productQueryParam.PAGE, page);
    setIsLoading(false);
  };
  const onUpdateRoutePath = (key, value) => {
    let path = router.asPath;
    const newPath = updateQueryFromString(path, {
      key,
      value
    });

    router.push(
      {
        pathname: router.pathname,
        query: {
          ...queryParams
        }
      },
      newPath,
      { shallow: true }
    );
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
    setProductData(products.data);
    if (!isEmpty(query) && isExists(query, 'page')) {
      setCurrentPage(Number(query['page']));
    } else {
      setCurrentPage(1);
    }
  }, [router.query.slug]);

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
                  filter={filter}
                  totalPage={products?.totalPage}
                  totalItem={products?.totalItems}
                  currentPage={filter.page}
                  onSetSelected={handleSelection}
                />
                <div className="ec__product--items">
                  <Grid columns={3}>
                    <Grid.Row>
                      {productData.map((prd) => (
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
                  totalItem={products?.totalItems}
                  showStatus={true}
                  currentPage={filter.page}
                  onSetcurrentPage={(page) =>
                    handleFetchData({
                      params: { page: page },
                      action: 'paginate'
                    })
                  }
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
