import { memo, useEffect, useMemo, useState } from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';
import Link from 'next/link';
import Card from '../../components/Card';
import { contentType } from '../../constants/constants';
import Pagination from '../Pagination';
import { client } from '../../api/client';
import { useDispatch, useSelector } from '../../providers/hooks';
import {
  LOAD_LIST_PRODUCT,
  UPDATE_PAGE_LIST_PRODUCT
} from '../../constants/actions';
const ProductCatList = (props) => {
  const { id, name, slug, image, products } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [prds, setPrds] = useState(products);
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.productList);

  const handleLoadProducts = async (page) => {
    setIsLoading(true);

    const listPrd = dataList.lists.find((list) => list.id === id);

    if (!listPrd) return;
    // check data and caching if already fetched.
    const isCached = listPrd.pageCache.includes(page);
    let data = [];
    let nextPage = page;
    if (isCached) {
      data = listPrd.items[page];
    } else {
      const response = await client.get(`category/${id}`, {
        page: nextPage
      });
      data = response.lists.data;
      nextPage = Number(response.lists.page);
    }

    setPrds((prevState) => ({
      ...prevState,
      data: data,
      page: nextPage
    }));

    dispatch({
      type: UPDATE_PAGE_LIST_PRODUCT,
      payload: {
        id: id,
        items: data,
        page: nextPage
      }
    });

    setIsLoading(false);
  };
  useEffect(() => {
    //check if data cached
    const listPrd = dataList.lists.find((list) => list.id === id);
    if (listPrd) {
      const data = listPrd.items[listPrd.currentPage];
      setPrds((prevState) => ({
        ...prevState,
        data: data,
        page: Number(listPrd.currentPage)
      }));
      // setCurrentPage(Number(listPrd.currentPage));
    } else {
      dispatch({
        type: LOAD_LIST_PRODUCT,
        payload: {
          id: id,
          items: products.data,
          page: products.page
        }
      });
    }
  }, []);

  return (
    <div className={`section-product ${id}`}>
      <Container>
        <div className="section-header">
          <Header>{name}</Header>
          <span>
            <Link href={`product-cat/${slug}`}>
              <a>Xem thêm</a>
            </Link>
          </span>
        </div>
        <div className="section-products">
          <Grid columns={5}>
            {prds.data.map((prd) => {
              return (
                <Grid.Column key={prd.id}>
                  <Card
                    type={contentType.PRODUCT}
                    data={prd}
                    isLoading={isLoading}
                  />
                </Grid.Column>
              );
            })}
          </Grid>
        </div>
        <div className="section-footer">
          <Pagination
            totalPage={prds.totalPages}
            pageRange={3}
            isLoading={isLoading}
            currentPage={Number(prds.page)}
            onSetcurrentPage={handleLoadProducts}
          />
        </div>
      </Container>
    </div>
  );
};

export default memo(ProductCatList);
