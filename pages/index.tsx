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
import CategoryItemList from '../components/common/Partials/CategoryItemList';
import { Container } from 'semantic-ui-react';
import { NextPageContext } from 'next';
const Home = (props) => {
  const { catListData, brand, device, categories } = props;

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

export async function getServerSideProps(ctx: NextPageContext) {
  let productList = [];
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
          lists: [...productList.data.products],
          totalItems: productList.data.totalItems,
          totalPage: productList.data.totalPage,
          page: productList.data.page
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