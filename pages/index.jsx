import { useState, useEffect, useContext } from 'react';

import SEO from '../components/common/Seo';
import { TOP_PROMOTIONS } from '../constants/menu';
import Brands from '../container/Brands';
import { data } from '../constants/brandsData.js';
import TopPromote from '../container/TopPromote';
import { getProductByCategoryId } from '../api/product';
import ProductCatList from '../container/ProductCatList';
import SingleBanner from '../container/SingleBanner';
import styles from '../styles/home.module.scss';

const Home = (props) => {
  const { brand, hutmui, hongngoai, gas, beptu } = props;

  return (
    <>
      <SEO title="Bep tu nhap khau" description="bep tu nhap khau chinh hang" />
      <div className="home__wrap">
        <div className={styles.home__leadr}>
          <TopPromote banner={TOP_PROMOTIONS} />
          <SingleBanner />
          <Brands data={brand} />
        </div>
        <ProductCatList
          slider
          id={hutmui.id}
          name={hutmui.name}
          slug={hutmui.slug}
          image={hutmui.image}
          products={hutmui.lists}
        />

        <ProductCatList
          slider
          id={hongngoai.id}
          name={hongngoai.name}
          slug={hongngoai.slug}
          image={hongngoai.image}
          products={hongngoai.lists}
        />

        <ProductCatList
          slider
          id={gas.id}
          name={gas.name}
          slug={gas.slug}
          image={gas.image}
          products={gas.lists}
        />

        <ProductCatList
          slider
          id={beptu.id}
          name={beptu.name}
          slug={beptu.slug}
          image={beptu.image}
          products={beptu.lists}
        />
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  console.log('regeneration home page');
  const prdHongNgoai = await getProductByCategoryId(19, { perPage: 10 });
  const prdGas = await getProductByCategoryId(18, { perPage: 10 });
  const prdBeptu = await getProductByCategoryId(16, {
    perPage: 10
  });
  const prdHutmui = await getProductByCategoryId(20, { perPage: 10 });

  return {
    props: {
      brand: data,
      hutmui: prdHutmui,
      hongngoai: prdHongNgoai,
      gas: prdGas,
      beptu: prdBeptu
      // categories: categories
    }
  };
}
export default Home;
