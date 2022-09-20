import { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import SEO from '../components/common/Seo';
import { Grid, Image } from 'semantic-ui-react';
import { TOP_PROMOTIONS } from '../constants/menu';
import Slider from '../components/Slider';
import styles from '../styles/home.module.scss';
import Brands from '../container/Brands';

import { data } from '../constants/brandsData.js';
const Home = (props) => {
  const { brand } = props;
  return (
    <>
      <SEO title="Bep tu nhap khau" description="bep tu nhap khau chinh hang" />
      <div className="home__wrap">
        <Container>
          <Grid>
            <Grid.Column width={10}>
              <Slider
                main
                autoPlay
                itemView={1}
                itemSpacing={15}
                duration={5000}
                pagination={4}
              >
                {TOP_PROMOTIONS.map((item, index) => (
                  <Slider.Item
                    key={index}
                    name={item.name}
                    path={item.path}
                    thumbnail={item.thumbnail}
                  />
                ))}
              </Slider>
            </Grid.Column>
            <Grid.Column width={6}>
              <div className={styles.ec__box}>
                <div className="ec__box--item">
                  <div className="ec__box--content">
                    <h4>Miễn phí vận chuyển</h4>
                    <p>
                      100% đơn hàng đều được miễn phí vận chuyển khi thanh toán
                      trước.
                    </p>
                  </div>
                </div>
                <div className="ec__box--item">
                  <div className="ec__box--content">
                    <h4>Bảo hành tận tâm</h4>
                    <p>
                      Bất kể giấy tờ thế nào, SGHOME luôn cam kết sẽ hỗ trợ
                      khách hàng tới cùng.
                    </p>
                  </div>
                </div>
                <div className="ec__box--item">
                  <div className="ec__box--content">
                    <h4>Đổi trả 1-1 hoặc hoàn tiền</h4>
                    <p>
                      Nếu phát sinh lỗi hoặc bạn cảm thấy sản phẩm chưa đáp ứng
                      được nhu cầu.
                    </p>
                  </div>
                </div>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
        <Brands data={brand}></Brands>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: { brand: data } // will be passed to the page component as props
  };
}
export default Home;
