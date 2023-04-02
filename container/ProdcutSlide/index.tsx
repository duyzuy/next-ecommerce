import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import { contentType } from '../../constants/constants';
import Card from '../../components/Card';
import * as Icon from 'react-feather';
import { ProductItemType } from '../../model';
const ProductSlide: React.FC<{
  products?: ProductItemType[];
  spacing?: number;
  viewItems?: number;
}> = ({ products, spacing, viewItems }) => {
  const slideRef = useRef(null);

  const onSwiperPrev = () => {
    slideRef.current.slidePrev();
  };
  const onSwiperNext = () => {
    slideRef.current.slideNext();
  };
  return (
    <>
      <Swiper
        spaceBetween={spacing || 20}
        slidesPerView={viewItems}
        pagination={{
          el: '.product-slide-progress',
          dynamicBullets: false,
          clickable: true,
          type: 'progressbar'
        }}
        loop={false}
        modules={[Pagination]}
        className="products-slide-swiper"
        onBeforeInit={(swiper) => {
          slideRef.current = swiper;
        }}
      >
        {products.map((prd) => (
          <SwiperSlide key={`${prd.id}`}>
            <Card type={contentType.PRODUCT} data={prd} isLoading={false} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="product-slide-actions">
        <div className="product-slide-btns">
          <span className="button button-next" onClick={onSwiperPrev}>
            <Icon.ChevronLeft size={24} />
          </span>
          <span className="button button-next" onClick={onSwiperNext}>
            <Icon.ChevronRight size={24} />
          </span>
        </div>
        <div className="product-slide-progress"></div>
      </div>
    </>
  );
};

export default ProductSlide;
