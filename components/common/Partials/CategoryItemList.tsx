import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper';
import { CategoryItemType } from '../../../model';

const CategoryItemList: React.FC<{
  spacing?: number;
  items?: CategoryItemType[];
  type?: 'grid' | 'slider';
  length?: number;
}> = ({ items, spacing, type = 'grid', length = 16 }) => {
  const itemFilter = useMemo(() => {
    let itemList = [];

    for (let count = 0; count < length; count++) {
      itemList[count] = items[count];
    }
    return itemList;
  }, [length, items]);
  if (type === 'slider') {
    return (
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        loop={false}
        freeMode={true}
        modules={[FreeMode, Pagination]}
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
        {itemFilter?.map((item, index) => (
          <SwiperSlide key={item?.id}>
            <div className="ec__cat--item">
              <Link href={`/product-cat/${item?.slug}`}>
                <a className="ec__cat--link">
                  <div className="ec__cat--thumbnail">
                    <Image
                      src={
                        item?.image !== null
                          ? item?.image?.src
                          : '/assets/images/image.svg'
                      }
                      alt={item?.name}
                      width={100}
                      height={100}
                      layout="responsive"
                      priority
                    />
                  </div>

                  <p className="sub--text">
                    <span>{item?.name}</span>
                  </p>
                </a>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  } else {
    return (
      <div className="ec__cat--lists grid">
        {itemFilter?.map((item, index) => (
          <div className="ec__cat--item" key={item?.id}>
            <Link href={`/product-cat/${item?.slug}`}>
              <a className="ec__cat--link">
                <div className="ec__cat--thumbnail">
                  <Image
                    src={
                      item?.image !== null
                        ? item?.image.src
                        : '/assets/images/image.svg'
                    }
                    alt={item?.name}
                    width={100}
                    height={100}
                    layout="responsive"
                    priority
                  />
                </div>

                <p className="sub--text">
                  <span>{item?.name}</span>
                </p>
              </a>
            </Link>
          </div>
        ))}
      </div>
    );
  }
};
export default CategoryItemList;
