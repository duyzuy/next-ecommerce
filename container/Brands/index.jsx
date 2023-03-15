import React from 'react';
import Slider from '../../components/Slider';
import { Container, Header } from 'semantic-ui-react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper';

import styles from '../../styles/brand.module.scss';

const breakPoint = {
  mobile: {
    width: 320,
    itemView: 3,
    itemScroll: 1
  },
  tablet: {
    width: 768,
    itemView: 5,
    itemScroll: 2
  },
  desktop: {
    width: 992,
    itemView: 6,
    itemScroll: 2
  }
};
const Brands = (props) => {
  const { data } = props;
  return (
    <div className={`ec__section ${styles.ec__brand}`}>
      <Container>
        <Header as="h3" className="ec__title">
          Thương hiệu nổi bật
        </Header>
        <div className="ec__brand--list">
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            scrollbar={{
              hide: true
            }}
            modules={[Scrollbar]}
            className="cat_list"
            breakpoints={{
              450: {
                slidesPerView: 4
              },

              768: {
                slidesPerView: 5
              },
              992: {
                slidesPerView: 6
              }
            }}
          >
            {data.map((brand, index) => (
              <SwiperSlide key={index}>
                <div className="brand-item">
                  <div className="brand-image">
                    <Image
                      src={brand.src}
                      layout="responsive"
                      width={900}
                      height={450}
                      placeholder="blur"
                      blurDataURL={brand.src}
                      objectFit="contain"
                    />
                  </div>
                  <div className="slide-box">
                    <Link href={brand.path}>
                      <a className="slide-btn">{brand.name}</a>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default Brands;
