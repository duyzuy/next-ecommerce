import { useRouter } from 'next/router';
import SEO from '../../../components/common/Seo';
import Breadcrumb from '../../../components/BreadCrumb';
import { Container, Header } from 'semantic-ui-react';
import { useMemo } from 'react';
import styles from '../../../styles/singleproduct.module.scss';

import * as Icon from 'react-feather';

import { useBreadcrumb } from '../../../hooks/useBreadcrumb';
import { getProductDetail, getProductsByIds } from '../../../api/product';
import ProductReview from '../../../container/ProductDetail/ProductReviews';
import ProductDescriptions from '../../../container/ProductDetail/ProductDescriptions';
import ProductGallery from '../../../container/ProductDetail/ProductGallery';

import ProductSlide from '../../../container/ProdcutSlide';
import ProductInfo from '../../../container/ProductDetail/ProductInfo';
import RightSidebar from '../../../container/ProductDetail/RightSidebar';
const ProductDetail = (props) => {
  const router = useRouter();
  const { data, reviews, productRelated } = props;

  const { breadItems } = useBreadcrumb(router);
  const images = useMemo(() => {
    return data?.images?.map((img) => {
      return {
        id: img.id,
        src: img.src,
        name: img.name
      };
    });
  }, [data?.images]);

  const onAddToCart = (id, product) => {
    console.log(id);
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
  }, []);
  return (
    <div className={styles.ec__product__single}>
      <SEO title={data?.name} description="bep tu nhap khau chinh hang" />
      <Breadcrumb items={breadCrumbItems} />

      <Container>
        <div className={'ec__wrapper'}>
          <div className="ec__product--left">
            <div className="ec__product--featured">
              <ProductGallery images={images} />
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
                  description={data.description}
                />
                <div className="divider"></div>
                <ProductReview title="Nhận xét & đánh giá" reviews={reviews} />
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

export async function getServerSideProps(ctx) {
  const { params } = ctx;

  const response = await getProductDetail({
    slug: params.slug
  });

  const { related_ids, upsell_ids } = response.product;
  const productRelated = await getProductsByIds(related_ids);

  return {
    props: {
      data: response.product,
      reviews: response.review,
      productRelated: productRelated
    }
  };
}
