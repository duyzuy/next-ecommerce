import { useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FreeMode, Pagination, Navigation } from 'swiper';
import { CategoryItemType } from '../../../model';
import * as Icon from 'react-feather';
const CategoryItemList: React.FC<{
  spacing?: number;
  items?: CategoryItemType[];
  type?: 'grid' | 'slider';
  length?: number;
}> = ({ items, spacing, type = 'grid', length = 16 }) => {
  const itemFilter = useMemo(() => {
    let itemList = [];
    if (items.length === 0) return itemList;
    for (let count = 0; count < length; count++) {
      itemList[count] = items[count];
    }
    return itemList;
  }, [length, items]);

  const slideRef = useRef(null);

  const onSwiperPrev = () => {
    slideRef.current.slidePrev();
  };
  const onSwiperNext = () => {
    slideRef.current.slideNext();
  };

  if (type === 'slider') {
    return (
      <>
        <Swiper
          onBeforeInit={(swiper) => {
            slideRef.current = swiper;
          }}
          spaceBetween={0}
          slidesPerView={3}
          loop={false}
          freeMode={true}
          modules={[FreeMode, Pagination, Navigation]}
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
              <CategoryItem key={item?.id} item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swipe-control">
          <div className="swipe-buttons">
            <span className="button button-next" onClick={onSwiperPrev}>
              <Icon.ChevronLeft size={16} />
            </span>
            <span className="button button-next" onClick={onSwiperNext}>
              <Icon.ChevronRight size={16} />
            </span>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="ec__cat--lists grid">
        {itemFilter?.map((item, index) => (
          <CategoryItem key={item?.id} item={item} />
        ))}
      </div>
    );
  }
};
export default CategoryItemList;

const CategoryItem: React.FC<{ item: CategoryItemType }> = ({ item }) => {
  return (
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
  );
};
