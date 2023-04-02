import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  getProductBySlug,
  getProductsByIds,
  getReviewsByProductId
} from '../../../api/product';
import { client } from '../../../api/client';
import { Container, Header } from 'semantic-ui-react';
import * as Icon from 'react-feather';
import { useBreadcrumb } from '../../../hooks/useBreadcrumb';
import SEO from '../../../components/common/Seo';
import Breadcrumb from '../../../components/BreadCrumb';
import ProductReview from '../../../container/ProductDetail/ProductReviews';
import ProductDescriptions from '../../../container/ProductDetail/ProductDescriptions';
import ProductGallery from '../../../container/ProductDetail/ProductGallery';
import ProductSlide from '../../../container/ProdcutSlide';
import ProductInfo from '../../../container/ProductDetail/ProductInfo';
import RightSidebar from '../../../container/ProductDetail/RightSidebar';
import { isValidEmail } from '../../../utils/validate';
import styles from '../../../styles/singleproduct.module.scss';
import { getSlugFromProducts } from '../../../api/product';
import { useDispatch, useSelector } from '../../../providers/hooks';
import { addBooking } from '../../../actions/booking';
import useCart from '../../../hooks/useCart';
import { toast } from '../../../lib/toast';
import { setPayment, isPayment } from '../../../constants/booking';
import { ProductItemType, ProductDetailType, ReviewType } from '../../../model';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

type NextPagePropsType = {
  data: ProductDetailType;
  reviews: {
    perPage: number;
    reviews: ReviewType[];
  };
  productRelated: ProductItemType[];
};
const ProductDetail: NextPage<NextPagePropsType> = ({
  data,
  reviews,
  productRelated
}) => {
  const router = useRouter();

  const breadItems = useBreadcrumb(router);
  const [productReviews, setProductReviews] = useState(reviews);
  const [isShowPayment, setIsShowPayment] = useState(false);
  const dispatch = useDispatch();
  const cart = useCart();
  const bookingInfor = useSelector((state) => state.booking);

  const onAddToCart = (
    prd: ProductItemType,
    quantity: number,
    callback: () => void
  ) => {
    const { id, sale_price, regular_price, name, images, categories, on_sale } =
      prd;

    toast({
      type: 'success',
      message: `Đã thêm vào giỏ hàng - <strong>${name}</strong>`
    });

    const prdItem = {
      id,
      price:
        Number(sale_price) === 0 ? Number(regular_price) : Number(sale_price),
      name,
      images,
      quantity: Number(quantity),
      categories,
      onSale: on_sale
    };

    dispatch(addBooking({ data: prdItem }));

    // cart.addItem({
    //   id: prdItem.id,
    //   quantity: prdItem.quantity,
    //   product: { ...prdItem }
    // });

    if (callback && typeof callback === 'function') {
      callback();
    }
    setIsShowPayment(true);
    setPayment(true);
  };

  const loadMoreReviews = async () => {
    const { perPage } = productReviews;

    if (perPage === data.rating_count) return;

    let nextPage = perPage + 3;

    if (nextPage > data.rating_count) {
      nextPage = data.rating_count;
    }

    const response = await client.get(`product/${data.id}/reviews`, {
      perPage: nextPage
    });

    setProductReviews((prevState) => ({
      ...prevState,
      perPage: response.perPage,
      reviews: response.data
    }));
  };
  const breadCrumbItems = useMemo(() => {
    return [
      ...breadItems,
      {
        id: 'productDetail',
        name: data?.name,
        path: `/${data?.slug}`,
        current: true
      }
    ];
  }, [data, breadItems]);

  const handleSubmitReview = async (reviewsData, callback) => {
    if (
      reviewsData.review === '' ||
      reviewsData.reviewer === '' ||
      reviewsData.reviewerEmail === '' ||
      reviewsData.rating === 0
    ) {
      return;
    }

    if (!isValidEmail(reviewsData.reviewerEmail)) {
      console.log('email not valid');
      return;
    }

    const dataSubmit = {
      review: reviewsData.review,
      reviewer: reviewsData.reviewer,
      reviewer_email: reviewsData.reviewerEmail,
      rating: reviewsData.rating
    };

    const response = await client.post(`product/${data.id}/reviews/create`, {
      ...dataSubmit
    });

    //Update new List on UI

    if (response.statusCode === 201) {
      const reviewList = await client.get(`product/${data.id}/reviews`);

      setProductReviews((prevState) => ({
        ...prevState,
        reviews: reviewList.data
      }));
      if (callback && typeof callback === 'function') callback();
    }
  };
  useEffect(() => {
    setPayment(false);
    if (bookingInfor.products.count === 0) {
      setPayment(true);
    }
  }, [bookingInfor]);
  useEffect(() => {
    setIsShowPayment(false);
  }, [data]);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.ec__product__single}>
      <SEO title={data?.name} description="bep tu nhap khau chinh hang" />
      <div className="product-bred">
        <Container>
          <Breadcrumb items={breadCrumbItems} />
        </Container>
      </div>
      <Container>
        <div className={'ec__wrapper'}>
          <div className="ec__product--left">
            <div className="ec__product--featured">
              <ProductGallery images={data?.images} />
            </div>

            <div className="ec__product--body">
              <div className="ec__product--content">
                <ProductInfo
                  title="Cấu hình & đặc điểm"
                  informations={data?.attributes}
                />
              </div>
              <div className="ec__product--content product-description">
                <ProductDescriptions
                  title="Thông tin sản phẩm"
                  description={data?.description}
                />
                <div className="divider"></div>
                <ProductReview
                  title="Nhận xét & đánh giá"
                  reviews={productReviews}
                  ratingCount={data?.rating_count}
                  averageRating={data?.average_rating}
                  product={data}
                  onSubmitReview={handleSubmitReview}
                  onLoadMore={loadMoreReviews}
                />
              </div>
            </div>
          </div>
          <RightSidebar
            data={data}
            addToCart={onAddToCart}
            isShowPayment={isShowPayment}
          />
        </div>
        {(productRelated && (
          <div className={styles.product_related}>
            <Header as="h4" className="ec__product--body--title">
              <Icon.Layers
                size={22}
                style={{
                  marginRight: 10,
                  position: 'relative',
                  top: 4
                }}
              />
              Sản phẩm khác
            </Header>
            <div className="product-list">
              <ProductSlide
                products={productRelated}
                viewItems={4}
                spacing={20}
              />
            </div>
          </div>
        )) || <></>}
      </Container>
    </div>
  );
};

export default ProductDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getSlugFromProducts('products', {
    page: 1,
    per_page: 5,
    order: 'desc',
    status: 'publish',
    orderby: 'date',
    type: 'simple',
    stock_status: 'instock'
  });

  let paths = products.data.map((prd) => ({
    params: { slug: prd.slug }
  }));
  return {
    paths: paths,
    fallback: 'blocking'
  };
};
interface Params extends ParsedUrlQuery {
  slug: string;
}
export const getStaticProps: GetStaticProps<NextPagePropsType, Params> = async (
  ctx
) => {
  const { params, locales, locale } = ctx;
  // console.log(`regenerate product detail ${params.slug}`);
  const response = await getProductBySlug(params.slug);
  // console.log(response);
  if (response.status === 404) {
    return {
      notFound: true
    };
  }

  const reviews = await getReviewsByProductId(response.data.id);

  const { related_ids, upsell_ids } = response.data;
  const productRelated = await getProductsByIds(related_ids);

  return {
    props: {
      data: response.data,
      reviews: reviews,
      productRelated: productRelated
    },
    revalidate: 10
  };
};
