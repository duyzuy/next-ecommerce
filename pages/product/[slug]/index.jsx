import { useState } from 'react';
import { useRouter } from 'next/router';
import SEO from '../../../components/common/Seo';
import Breadcrumb from '../../../components/BreadCrumb';
import { Container, Header, Grid } from 'semantic-ui-react';
import { useMemo } from 'react';
import styles from '../../../styles/singleproduct.module.scss';
import Price from '../../../components/Price';
import * as Icon from 'react-feather';
import Link from 'next/link';
import { useBreadcrumb } from '../../../hooks/useBreadcrumb';
import ProductReview from '../../../container/ProductDetail/ProductReviews';
import ProductDescriptions from '../../../container/ProductDetail/ProductDescriptions';
import ProductGallery from '../../../container/ProductDetail/ProductGallery';
import Rating from '../../../components/Rating';
import { getProductByIds, getProductDetail } from '../../../api/product';
import ProductSlider from '../../../container/ProductSlider';
const ProductDetail = (props) => {
  const router = useRouter();
  const { data, reviews, related } = props;
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

  const addToCard = (id, product) => {
    console.log(id);
  };

  const items = useMemo(() => {
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
    <div className="ec__wrapper single-product">
      <SEO title={data?.name} description="bep tu nhap khau chinh hang" />
      <Breadcrumb items={items} />
      <Container>
        <div className={styles.ec__product__single}>
          <div className="ec__product--left">
            <div className="ec__product--featured">
              <ProductGallery images={images} />
            </div>

            <div className="ec__product--body">
              <div className="ec__product--content">
                <Header as="h4" className="ec__product--body--title">
                  <Icon.Grid
                    size={22}
                    style={{
                      marginRight: 10,
                      position: 'relative',
                      marginRight: 10,
                      top: 4
                    }}
                  />
                  Cấu hình & đặc điểm
                </Header>
                <div className="ec__product--infor">
                  <div className="ec__product--attr">
                    {data?.attributes?.map((attr, index) => (
                      <div className="attr-item" key={`attr-item-${index}`}>
                        <p className="attr-label">{attr.name}</p>
                        <p className="arrr-names">
                          {attr?.options?.map((op, index) => (
                            <span className="attr-name" key={`n-${index}`}>
                              {op}
                            </span>
                          ))}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ec__product--more--infor">
                  <span className="button button--link has-icon">
                    Xem chi tiết cấu hình <Icon.ChevronRight size={14} />
                  </span>
                </div>
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
          <div className="ec__product--right">
            <div className="ec__product--right--inner">
              <div className="ec__product--shortDes">
                <Rating
                  average={data.average_rating}
                  rating={data.rating_count}
                  isAllow={data.reviews_allowed}
                  starIcon={() => (
                    <Icon.Star size={18} style={{ marginRight: 5 }} />
                  )}
                />
                <h1
                  className="ec__product--title"
                  dangerouslySetInnerHTML={{ __html: data?.name }}
                ></h1>

                <div className="ec__product--info">
                  <p className="info-item sku">
                    <span className="info-label">SKU</span>
                    <span className="info-name">{data?.sku}</span>
                  </p>
                  <p className="info-item">
                    <span className="info-label">In-stock</span>
                    <span className="info-name">
                      {data?.stock_status === 'instock' ? (
                        <span className="info-icon in-stock">
                          <Icon.CheckCircle
                            size={14}
                            style={{ color: '#4caf50' }}
                          />
                        </span>
                      ) : (
                        <span className="stock-icon out-stock">
                          <Icon.Slash size={14} />
                        </span>
                      )}
                    </span>
                  </p>
                </div>
                <div className="ec__product--cat">
                  <div className="ec__product--label">Danh mục</div>
                  <div className="ec__product--catnames">
                    {data?.categories.map((cat) => (
                      <span className="cat-name" key={cat.id}>
                        <Link href={`../product-cat/${cat.slug}`}>
                          <a>{cat.name}</a>
                        </Link>
                      </span>
                    ))}
                  </div>
                </div>
                <Price
                  asSingle
                  price={data?.price}
                  regularPrice={data?.regular_price}
                  salePrice={data?.sale_price}
                />
                <div className="ec__product--action">
                  <button
                    onClick={() => addToCard(data.id, data)}
                    className="ec__product--addToCard"
                  >
                    <Icon.ShoppingCart size={16} />
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ec__product__related}>
          <Header as="h4" className="ec__product--body--title">
            <Icon.Grid
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

          <div className="prd__related--list">
            <ProductSlider products={related} spacing={20} perView={4} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;

export async function getServerSideProps(ctx) {
  const { params } = ctx;

  const productDetail = await getProductDetail({
    slug: params.slug
  });
  const ids = productDetail.product.related_ids;

  const productRelated = await getProductByIds([...ids]);
  console.log(productRelated);
  return {
    props: {
      data: productDetail.product,
      reviews: productDetail.review,
      related: productRelated
    }
  };
}
