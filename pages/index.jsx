import { useState, useEffect, useContext } from 'react';
import { Container } from 'semantic-ui-react';

import SEO from '../components/common/Seo';
import { TOP_PROMOTIONS } from '../constants/menu';
import Brands from '../container/Brands';
import { data } from '../constants/brandsData.js';
import TopPromote from '../container/TopPromote';
import styles from '../styles/home.module.scss';
import { AppContext } from '../contexts';
const Home = (props) => {
  const { brand } = props;
  const { currency } = useContext(AppContext);

  return (
    <>
      <SEO title="Bep tu nhap khau" description="bep tu nhap khau chinh hang" />
      <div className="home__wrap">
        <TopPromote banner={TOP_PROMOTIONS} />
        {/* <Brands data={brand} /> */}
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  return {
    props: { brand: data } // will be passed to the page component as props
  };
}
export default Home;
