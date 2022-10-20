import { Container, Grid } from 'semantic-ui-react';

import Image from 'next/image';

import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper';
import styles from '../../styles/top_promote.module.scss';
const TopPromote = (props) => {
  const { banner } = props;
  return (
    <div className={`ec__section ${styles.ec__promote}`}>
      <Container>
        <Grid>
          <Grid.Column
            mobile={16}
            tablet={16}
            computer={10}
            className="ec__promote--slide"
          >
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              loop={false}
              // freeMode={true}
              modules={[FreeMode, Pagination]}
              className="cat_list"
            >
              {banner.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="top-slide">
                    <Image
                      src={item.src}
                      layout="intrinsic"
                      width={900}
                      height={450}
                      placeholder="blur"
                      blurDataURL={item.src}
                      objectFit="cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={16}
            computer={6}
            className="ec__promote--box"
          >
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
                    Bất kể giấy tờ thế nào, SGHOME luôn cam kết sẽ hỗ trợ khách
                    hàng tới cùng.
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
    </div>
  );
};

export default TopPromote;
