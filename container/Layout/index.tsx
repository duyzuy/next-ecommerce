import { useEffect, useMemo, useState, useCallback } from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';
import Card from '../../components/Card';
import SideBar from '../SideBar';
import Pagination from '../../container/Pagination';
import ProductToolBar from '../ProductToolBar';
import { contentType } from '../../constants/constants';
import { productFilterValue } from '../../constants/product';
import { updateQueryFromString } from '../../utils';
import Breadcrumb from '../../components/BreadCrumb';
import SEO from '../../components/common/Seo';
import { useBreadcrumb } from '../../hooks/useBreadcrumb';
import { client } from '../../api/client';
import styles from '../../styles/product.module.scss';
import { ProductItemType } from '../../model/product';
import { CategoryItemType } from '../../model/category';
import { ProductAttributeType } from '../../model';
import { NextRouter } from 'next/router';
type PropsType = {
  products?: {
    data: ProductItemType[];
    page: number;
    totalItems: number;
    totalPage: number;
  };
  type?: string;
  isCategory?: boolean;
  category?: CategoryItemType;
  attribures?: ProductAttributeType[];
  router?: NextRouter;
};
const Layout: React.FC<PropsType> = (props) => {
  const { products, isCategory, category, attribures, router } = props;

  const [productData, setProductData] = useState(products.data);
  const [filter, setFilter] = useState({ ...productFilterValue });
  const breadItems = useBreadcrumb(router);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelection = (select: {
    key: string;
    text: string;
    value: string;
  }) => {
    const queries = select.value.split('&');
    const queryParams = queries.reduce((acm, item) => {
      setFilter((prevState) => ({
        ...prevState,
        [item.split('=')[0]]: item.split('=')[1]
      }));

      acm[item.split('=')[0]] = item.split('=')[1];

      return acm;
    }, {});

    onFetchProductData({ params: { ...queryParams }, action: 'filter' });
  };

  const onFetchProductData = async (data: {
    params: { [key: string]: any };
    action: string;
  }) => {
    const { params, action } = data;
    setIsLoading(true);

    //update filter
    let newFilter = {
      ...filter,
      ...params
    };

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
    // if (action === 'paginate') {
    //   onUpdateRoutePath(productFilterKeys.PAGE, params.page);
    // }

    setIsLoading(false);
  };

  const onUpdateRoutePath = (key: string, value: string) => {
    let path = router.asPath;
    let queryParams = {};
    const newPath = updateQueryFromString(path, {
      key,
      value
    });
    if (isCategory) {
      queryParams = {
        ...queryParams,
        slug: category.slug
      };
    }
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...queryParams
        }
      },
      newPath,
      { shallow: true, scroll: false }
    );
  };

  const breadcrumbItems = useMemo(() => {
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
    setFilter({ ...productFilterValue });
  }, [router.query.slug]);

  return (
    <div className="layout has-sidebar">
      <SEO
        title={`${(isCategory && category?.name) || 'Bếp từ nhập khẩu'}`}
        description="bep tu nhap khau chinh hang"
      />
      <Container>
        <Breadcrumb items={breadcrumbItems} />
      </Container>
      <div className="layout-container">
        <div className={styles.ec__product}>
          <Container>
            <div className="ec__product--header">
              <Header as="h1">
                {(isCategory && category?.name) || 'Sản phẩm'}
              </Header>
            </div>
            <div className="ec__product--container">
              <SideBar type="category" attribures={attribures} />
              <div className="ec__product--list">
                <ProductToolBar
                  isLoading={false}
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
                  currentPage={Number(filter.page)}
                  onSetcurrentPage={(page) =>
                    onFetchProductData({
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

export default Layout;
