import { Container, Grid, Header, Icon } from 'semantic-ui-react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper';
import styles from '../../styles/top_promote.module.scss';
import * as Icons from 'react-feather';

const TopPromote = (props) => {
  const { banner, isDesktop } = props;
  return (
    <div className={`ec__section ${styles.ec_promote}`}>
      <Container>
        <Grid>
          <Grid.Column
            mobile={16}
            tablet={16}
            computer={10}
            className="ec__promote--slide"
          >
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              pagination={{
                dynamicBullets: true
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false
              }}
              modules={[Autoplay, Pagination]}
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
                    <div className="slide-box">
                      <p className="title">{item.name}</p>
                      <Link href={item.path}>
                        <a className="slide-btn">
                          Xem ngay
                          <span className="icon">
                            <Icons.ArrowRight size={12} />
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid.Column>
          {(isDesktop && (
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
          )) || <></>}
        </Grid>
      </Container>
    </div>
  );
};

export default TopPromote;
