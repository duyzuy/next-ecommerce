import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import * as Icon from 'react-feather';
import Card from '../../components/Card';
import { contentType } from '../../constants/constants';
const ProductSlider = (props) => {
  const { products, perView, spacing } = props;

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    }
  };

  return (
    <>
      <Swiper
        spaceBetween={spacing}
        slidesPerView={perView}
        loop={false}
        pagination={pagination}
        modules={[Pagination]}
        className="product__list--slider"
      >
        {products &&
          products.map((prd) => (
            <SwiperSlide key={prd.id}>
              <Card type={contentType.PRODUCT} data={prd} isLoading={false} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default ProductSlider;
