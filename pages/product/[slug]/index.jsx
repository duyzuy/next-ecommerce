import { useMemo, useState } from 'react';
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

const ProductDetail = (props) => {
  const router = useRouter();
  const { data, reviews, productRelated } = props;

  const { breadItems } = useBreadcrumb(router);

  const [productReviews, setProductReviews] = useState(reviews);

  const onAddToCart = (id, product) => {
    console.log(id);
  };

  const loadMoreReviews = async () => {
    const { perPage } = productReviews;

    if (perPage === data.rating_count) return;

    const nextPage = perPage + 3;

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

  // useEffect(() => {
  //   (async () => {
  //     const reviewList = await client.get(`product/${data.id}/reviews`, {
  //       perPage: 100
  //     });
  //     console.log(reviewList);
  //   })();
  // }, [data.id]);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.ec__product__single}>
      <SEO title={data?.name} description="bep tu nhap khau chinh hang" />
      <Breadcrumb items={breadCrumbItems} />

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
          <RightSidebar data={data} addToCart={onAddToCart} />
        </div>
        {(productRelated && (
          <div className={styles.product_related}>
            <Header as="h4" className="ec__product--body--title">
              <Icon.Layers
                size={22}
                style={{
                  marginRight: 10,
                  position: 'relative',
                  marginRight: 10,
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

export async function getStaticPaths() {
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
}

export async function getStaticProps(ctx) {
  const { params, locales, locale } = ctx;

  console.log(`regenerate product detail ${params.slug}`);
  const response = await getProductBySlug(params.slug);
  if (response.statusCode === 404) {
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
}
