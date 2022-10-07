import { useEffect, useState } from 'react';
import CustomImage from '../../../components/CustomImage';
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar';
import { FreeMode, Navigation, Thumbs, Pagination, Scrollbar } from 'swiper';
import * as Icon from 'react-feather';

const ProductGallery = ({ images }) => {
  const [productSwiper, setProductSwiper] = useState(null);
  const [productSwiperGallery, setProductSwiperGallery] = useState(null);

  const [statusSlide, setStatusSlide] = useState({
    active: 1,
    total: 1
  });

  const onSwiperNext = () => {
    productSwiperGallery.slideNext();
  };

  const onSwiperPrev = () => {
    productSwiperGallery.slidePrev();
  };

  const onUpdateStatusSlide = () => {
    setStatusSlide((prev) => ({
      ...prev,
      active: productSwiperGallery.activeIndex + 1
    }));
  };
  const onPlayVideo = () => {};
  console.log(statusSlide);
  console.log(
    productSwiperGallery?.imagesLoaded,
    productSwiperGallery?.activeIndex
  );
  useEffect(() => {
    setStatusSlide({
      active: productSwiperGallery?.activeIndex + 1,
      total: productSwiperGallery?.imagesLoaded
    });
  }, [productSwiperGallery?.imagesLoaded]);
  return (
    <>
      {' '}
      <div className="ec__product--gallery vertical">
        {/* <p>Current slide is {swiperSlide.isActive ? 'active' : 'not active'}</p> */}
        <div className="product-swiper-main">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop={false}
            onSlideChange={onUpdateStatusSlide}
            thumbs={{
              swiper:
                productSwiper && !productSwiper.destroyed ? productSwiper : null
            }}
            modules={[Thumbs, FreeMode]}
            className="product-swiper"
            onSwiper={setProductSwiperGallery}
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
          <div>
            <Swiper
              spaceBetween={10}
              watchSlidesProgress
              direction={'vertical'}
              modules={[Thumbs, FreeMode]}
              className="product-thumb-swipper"
              onSwiper={setProductSwiper}
              cssMode={true}
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
      </div>
      <div className="ec__product--bottom">
        <div className="ec__product--gallery--btns">
          <span className="button button-next" onClick={onSwiperPrev}>
            <Icon.ChevronLeft size={24} />
          </span>
          <span className="button button-next" onClick={onSwiperNext}>
            <Icon.ChevronRight size={24} />
          </span>
        </div>
        <div className="ec__product--gallery--actions">
          <span className="button">
            <Icon.Camera size={24} />{' '}
            <span className="text">
              {' '}
              {`${statusSlide.active}/${statusSlide.total}`}
            </span>
          </span>
          <span className="button" onClick={onPlayVideo}>
            <Icon.Video size={24} />
            <span className="text">Video</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductGallery;
