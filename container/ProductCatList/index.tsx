import React, { memo, useEffect, useState } from 'react';
import { Container, Header } from 'semantic-ui-react';
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
import { CategoryItemType, ProductItemType } from '../../model';

import { CacheItemType } from '../../reducer/productList';
const ProductCatList: React.FC<{
  catData: CategoryItemType & {
    totalPage: number;
    totalItems: number;
    page: number;
    lists: ProductItemType[];
  };
  slider?: boolean;
}> = ({ catData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryData, setCategoryData] = useState(catData);
  const dispatch = useDispatch();
  const dataCached: {
    isLoading: boolean;
    lists: CacheItemType[];
  } = useSelector((state) => state.productList);

  const handleLoadProducts = async (page: number) => {
    setIsLoading(true);

    const listPrd = dataCached.lists.find(
      (list) => list.id === categoryData.id
    );

    if (!listPrd) return;
    // check data and caching if already fetched.
    const isCached = listPrd.pageCache.includes(page);
    let prdList = [];
    let nextPage = page;
    if (isCached) {
      prdList = listPrd.items[page];
    } else {
      const response = await client.get(`category/${categoryData.id}`, {
        page: nextPage
      });
      console.log(response);
      prdList = response.lists.data;
      nextPage = Number(response.lists.page);
    }

    setCategoryData((prevState) => ({
      ...prevState,
      lists: prdList,
      page: nextPage
    }));

    dispatch({
      type: UPDATE_PAGE_LIST_PRODUCT,
      payload: {
        id: categoryData.id,
        items: prdList,
        page: nextPage,
        isCached
      }
    });

    setIsLoading(false);
  };

  useEffect(() => {
    //check if data cached
    const listPrd = dataCached.lists.find(
      (list) => list.id === categoryData.id
    );
    if (listPrd) {
      const listPrdFromState = listPrd.items[listPrd.currentPage];
      setCategoryData((prevState) => ({
        ...prevState,
        lists: listPrdFromState,
        page: Number(listPrd.currentPage)
      }));
      // setCurrentPage(Number(listPrd.currentPage));
    } else {
      dispatch({
        type: LOAD_LIST_PRODUCT,
        payload: {
          id: categoryData.id,
          items: categoryData.lists,
          page: categoryData.page
        }
      });
    }
  }, []);

  return (
    <div className={`section-product cat-${categoryData.id}`}>
      <Container>
        <div className="section-header">
          <Header>{categoryData.name}</Header>
          <span>
            <Link href={`product-cat/${categoryData.slug}`}>
              <a>Xem thêm</a>
            </Link>
          </span>
        </div>
        <div className="section-products">
          <div className="flx-row mobile-2 tablet-3 computer-5">
            {categoryData.lists.map((prd) => {
              return (
                <div className="flx-col" key={prd.id}>
                  <Card
                    type={contentType.PRODUCT}
                    data={prd}
                    isLoading={isLoading}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="section-footer">
          <Pagination
            totalPage={categoryData.totalPage}
            pageRange={3}
            isLoading={isLoading}
            currentPage={Number(categoryData.page)}
            onSetcurrentPage={handleLoadProducts}
          />
        </div>
      </Container>
    </div>
  );
};

export default memo(ProductCatList);
