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
import { getProductsByCategoryId } from '../api/products';
import { getSlider } from '../api/post';
import ProductCatList from '../container/ProductCatList';
import SingleBanner from '../container/SingleBanner';
import styles from '../styles/home.module.scss';
import CategoryItemList from '../components/common/Partials/CategoryItemList';
import { Container } from 'semantic-ui-react';

import {
  BrandItemType,
  CategoryItemType,
  DeviceType,
  ProductItemType,
  SliderItem
} from '../model';
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
  sliders: SliderItem[];
}> = (props) => {
  const { catListData, brand, sliders } = props;
  const device = useSelector((state) => state.device);
  const categories = useSelector((state) => state.menu.categories);
  console.log({ catListData });
  return (
    <>
      <SEO title="Bep tu nhap khau" description="bep tu nhap khau chinh hang" />
      <div className="home__wrap">
        <div className={styles.promotion}>
          <TopPromote items={sliders} isDesktop={device.isDesktop} />
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
          <ProductCatList slider key={catData.key} catData={catData} small />
        ))}
      </div>
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let categoryListData: CatListDataItemType[] = [];
  let sliders = [];
  const slider = await getSlider(103);
  if (slider.status === 200) {
    sliders = slider.data.list;
  }

  await Promise.all(
    HOME_PAGE_PRODUCT_SECTION.map(async (catItem) => {
      const category = await getProductCategoryDetail(catItem.id);

      if (category.status === 200) {
        // const productList = await getProductListByCatId(category.data.id, {
        //   per_page: 5
        // });
        // categoryListData = [
        //   ...categoryListData,
        //   {
        //     ...category.data,
        //     key: catItem.key,
        //     id: category.data.id,
        //     lists: productList.data.products,
        //     totalItems: productList.data.totalItems,
        //     totalPage: productList.data.totalPage,
        //     page: productList.data.page
        //   }
        // ];

        const productList = await getProductsByCategoryId(category.data.id, {
          status: 'publish',
          per_page: 5,
          orderby: 'date',
          order: 'desc'
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
      catListData: categoryListData,
      sliders
    }
  };
}
export default Home;
