import { useState, useEffect, useContext } from 'react';

import SEO from '../components/common/Seo';
import { TOP_PROMOTIONS } from '../constants/menu';
import Brands from '../container/Brands';
import { data } from '../constants/brandsData.js';
import TopPromote from '../container/TopPromote';
import {
  getProductCategoryDetail,
  getProductListByCatId
} from '../api/product';
import ProductCatList from '../container/ProductCatList';
import SingleBanner from '../container/SingleBanner';
import styles from '../styles/home.module.scss';

const Home = (props) => {
  const { catListData, brand } = props;

  return (
    <>
      <SEO title="Bep tu nhap khau" description="bep tu nhap khau chinh hang" />
      <div className="home__wrap">
        <div className={styles.home__leadr}>
          <TopPromote banner={TOP_PROMOTIONS} />
          <SingleBanner />
          <Brands data={brand} />
        </div>

        {catListData.map(
          (catData) =>
            catData.status !== 404 && (
              <ProductCatList slider key={catData.key} catData={catData} />
            )
        )}
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  console.log('regeneration home page');
  const CATEGORIES = [
    {
      id: 19,
      key: 'hongNgoai'
    },
    {
      id: 18,
      key: 'bepGas'
    },
    {
      id: 16,
      key: 'bepTu'
    },
    {
      id: 20,
      key: 'hutMui'
    }
  ];
  const catListData = await Promise.all(
    CATEGORIES.map(async (catItem) => {
      const response = await getProductCategoryDetail(catItem.id);

      if (response.status === 200) {
        const productList = await getProductListByCatId(catItem.id, {
          per_page: 10
        });
        return {
          ...response.data,
          key: catItem.key,
          id: catItem.id,
          lists: [...productList.data],
          totalItems: productList.totalItems,
          totalPage: productList.totalPage,
          page: productList.page
        };
      } else {
        return {
          ...response.data,
          lists: []
        };
      }
    })
  );

  return {
    props: {
      brand: data,
      catListData: [...catListData]
    }
  };
}
export default Home;
