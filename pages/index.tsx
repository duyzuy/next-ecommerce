import React from 'react';
import { NextPage, NextPageContext } from 'next';
import SEO from '../components/common/Seo';
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
import CategoryItemList from '../components/common/Partials/CategoryItemList';
import { Container } from 'semantic-ui-react';

import { BrandItemType, CategoryItemType, ProductItemType } from '../model';
import {
  HOME_PAGE_PRODUCT_SECTION,
  TOP_PROMOTIONS
} from '../constants/settings';
import { useSelector } from '../providers/hooks';
type CatListDataItemType = CategoryItemType & {
  key: string;
  lists: ProductItemType[];
  totalItems: number;
  totalPage: number;
  page: number;
};
const Home: NextPage<{
  catListData: CatListDataItemType[];
  brand: BrandItemType[];
  device;
  categories;
}> = (props) => {
  const { catListData, brand, categories } = props;
  const device = useSelector((state) => state.device);
  return (
    <>
      <SEO title="Bep tu nhap khau" description="bep tu nhap khau chinh hang" />
      <div className="home__wrap">
        <div className={styles.promotion}>
          <TopPromote banner={TOP_PROMOTIONS} isDesktop={device.isDesktop} />
          {(!device.isDesktop && (
            <div className="section__cat">
              <Container>
                <CategoryItemList items={categories} type="grid" length={8} />
              </Container>
            </div>
          )) || <></>}

          <SingleBanner />
          <Brands data={brand} />
        </div>

        {catListData.map((catData) => (
          <ProductCatList slider key={catData.key} catData={catData} />
        ))}
      </div>
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let categoryListData: CatListDataItemType[] = [];

  await Promise.all(
    HOME_PAGE_PRODUCT_SECTION.map(async (catItem) => {
      const category = await getProductCategoryDetail(catItem.id);

      if (category.status === 200) {
        const productList = await getProductListByCatId(catItem.id, {
          per_page: 10
        });
        categoryListData = [
          ...categoryListData,
          {
            ...category.data,
            key: catItem.key,
            id: category.data.id,
            lists: productList.data.products,
            totalItems: productList.data.totalItems,
            totalPage: productList.data.totalPage,
            page: productList.data.page
          }
        ];
      }
    })
  );

  return {
    props: {
      brand: data,
      catListData: categoryListData
    }
  };
}
export default Home;
