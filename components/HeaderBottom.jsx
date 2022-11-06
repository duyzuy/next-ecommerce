import { useState } from 'react';
import Image from 'next/image';
import { Container } from 'semantic-ui-react';

import Link from 'next/link';
import Slider from './Slider';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper';
import styles from '../styles/header.module.scss';
const HeaderBottom = (props) => {
  const { items, spacing } = props;

  return (
    <div id="ec_header_bottom" className={styles.ec_header_bottom}>
      <Container>
        <Swiper
          spaceBetween={20}
          slidesPerView={6}
          loop={false}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="cat_list"
        >
          {items?.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className="ec__cat--item">
                <Link href={`/product-cat/${item.slug}`}>
                  <a className="ec__cat--link">
                    <div className="ec__cat--thumbnail">
                      <Image
                        src={
                          item.image !== null
                            ? item.image.src
                            : '/assets/images/image.svg'
                        }
                        alt={item.name}
                        width={100}
                        height={100}
                        layout="responsive"
                        priority
                      />
                    </div>

                    <p className="sub--text">{item.name}</p>
                  </a>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};
export default HeaderBottom;
