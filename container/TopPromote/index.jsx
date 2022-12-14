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
  const { banner } = props;
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
          <Grid.Column
            mobile={16}
            tablet={16}
            computer={6}
            className="ec__promote--box"
          >
            <div className={styles.ec__box}>
              <div className="ec__box--item">
                <div className="ec__box--content">
                  <h4>Mi???n ph?? v???n chuy???n</h4>
                  <p>
                    100% ????n h??ng ?????u ???????c mi???n ph?? v???n chuy???n khi thanh to??n
                    tr?????c.
                  </p>
                </div>
              </div>
              <div className="ec__box--item">
                <div className="ec__box--content">
                  <h4>B???o h??nh t???n t??m</h4>
                  <p>
                    B???t k??? gi???y t??? th??? n??o, SGHOME lu??n cam k???t s??? h??? tr??? kh??ch
                    h??ng t???i c??ng.
                  </p>
                </div>
              </div>
              <div className="ec__box--item">
                <div className="ec__box--content">
                  <h4>?????i tr??? 1-1 ho???c ho??n ti???n</h4>
                  <p>
                    N???u ph??t sinh l???i ho???c b???n c???m th???y s???n ph???m ch??a ????p ???ng
                    ???????c nhu c???u.
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
