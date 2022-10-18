import { useState, useEffect, useContext } from 'react';
import { Container } from 'semantic-ui-react';

import SEO from '../components/common/Seo';
import { TOP_PROMOTIONS } from '../constants/menu';
import Brands from '../container/Brands';
import { data } from '../constants/brandsData.js';
import TopPromote from '../container/TopPromote';
import styles from '../styles/home.module.scss';
import { AppContext } from '../contexts';
import { getProductByCategoryId, getCategires } from '../api/product';
import ProductCatList from '../container/ProductCatList';
const Home = (props) => {
  const { brand, categories, hutmui, hongngoai, gas, beptu } = props;

  const { currency } = useContext(AppContext);

  return (
    <>
      <SEO title="Bep tu nhap khau" description="bep tu nhap khau chinh hang" />
      <div className="home__wrap">
        <TopPromote banner={TOP_PROMOTIONS} />
        {/* <Brands data={brand} /> */}
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
      </div>
    </>
  );
};

export async function getStaticProps(ctx) {
  const prdHongNgoai = await getProductByCategoryId(19, { perPage: 10 });
  const prdGas = await getProductByCategoryId(18, { perPage: 10 });
  const prdBeptu = await getProductByCategoryId(16, { perPage: 10 });
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
