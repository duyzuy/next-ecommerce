import { useState } from 'react';
import CustomImage from '../../../components/CustomImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper';

const ProductGallery = ({ images }) => {
  const [productThumb, setProductThumb] = useState(null);

  const handleSlideChange = () => {
    console.log(productThumb);
  };

  return (
    <div className="ec__product--gallery vertical">
      <div className="product-swiper-main">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff'
          }}
          loop={false}
          navigation={true}
          thumbs={{
            swiper:
              productThumb && !productThumb.destroyed ? productThumb : null
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="product-swiper"
        >
          {images &&
            images.map((img, index) => (
              <SwiperSlide key={`img-${index}`}>
                <div className="ec__product--img">
                  <CustomImage
                    src={img.src}
                    alt={img.name}
                    width={100}
                    height={100}
                    layout="responsive"
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="product-swiper-thumb">
        <Swiper
          onSwiper={setProductThumb}
          spaceBetween={10}
          slidesPerView={8}
          modules={[FreeMode, Navigation, Thumbs]}
          direction={'vertical'}
          className="product-thumb-swipper"
        >
          {images &&
            images.map((img, index) => (
              <SwiperSlide key={`img-${index}`}>
                <div className="ec__product--thumb">
                  <CustomImage
                    src={img.src}
                    alt={img.name}
                    width={100}
                    height={100}
                    layout="responsive"
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductGallery;
