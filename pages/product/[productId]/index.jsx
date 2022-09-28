import { useRouter } from 'next/router';
import { isEmpty, isExists } from '../../../utils/helper';
import { client } from '../../../api/client';
import SEO from '../../../components/common/Seo';
import Breadcrumb from '../../../components/BreadCrumb';
import { Container, Header, Grid } from 'semantic-ui-react';
import { useMemo } from 'react';
import Slider from '../../../components/Slider';
import styles from '../../../styles/singleproduct.module.scss';
import Price from '../../../components/Price';
import * as Icon from 'react-feather';
const ProductDetail = (props) => {
  const router = useRouter();
  const { data } = props;

  const images = useMemo(() => {
    return data.images.map((img) => {
      return {
        id: img.id,
        src: img.src,
        name: img.name
      };
    });
  }, [data.images]);

  const addToCard = (id, product) => {
    console.log(id);
  };
  return (
    <div className="ec__wrapper single-product">
      <SEO title={data.name} description="bep tu nhap khau chinh hang" />
      <Breadcrumb
        items={[
          { id: 'home', name: 'Trang chủ', href: '/' },
          { id: 'prroduct', name: 'Sản phẩm', href: '/product' },
          {
            id: 'productDetail',
            name: data.name,
            href: `/${data.id}`,
            current: true
          }
        ]}
      />
      <Container className={styles.ec__product__single}>
        <div className="ec__product--top">
          <div className="ec__product-top-row">
            <div className="ec__product-thumbail">
              <Slider itemScroll={1} itemView={1} asMain itemSpacing={15}>
                {images &&
                  images.map((img) => (
                    <Slider.Item key={img.id} asChild>
                      <div className="ec__product--img">
                        <img src={img.src} />
                      </div>
                    </Slider.Item>
                  ))}
              </Slider>
            </div>
            <div className="ec__product--shortDes">
              <h1
                className="ec__product--title"
                dangerouslySetInnerHTML={{ __html: data.name }}
              ></h1>
              <div className="ec__product--attr">
                {data.attributes.map((attr) => (
                  <div className="attr-item" key={attr.id}>
                    <p className="attr-label">{attr.name}</p>
                    <p className="arrr-names">
                      {attr.options.map((op, index) => (
                        <span className="attr-name" key={index}>
                          {op}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
              <div className="ec__product--info">
                <p className="info-item">
                  <span className="info-label">SKU</span>
                  <span className="info-name">{data.sku}</span>
                </p>
                <p className="info-item">
                  <span className="info-label">Stock</span>
                  <span className="info-name">{data.stock_status}</span>
                </p>
              </div>
              <Price
                price={data.price}
                regularPrice={data.regular_price}
                salePrice={data.sale_price}
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
        <div className="ec__product--body">
          <div className="ec__product--content">
            <Header as="h4" className="short-title">
              Thông tin sản phẩm
            </Header>
            <div
              className="ec__product--description"
              dangerouslySetInnerHTML={{ __html: data.description }}
            ></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;
export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
  let paths = [];
  await client
    .get(`product`)
    .then((res) => {
      res.data.forEach((prd) => {
        paths.push({ params: { productId: prd.id.toString() } });
      });
    })
    .catch((error) => {
      console.log(error);
    });
  return {
    paths,
    fallback: false // can also be true or 'blocking'
  };
}
export async function getStaticProps(context) {
  const { params } = context;

  const response = await client
    .get(`product/${Number(params.productId)}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: { data: response.data }
  };
}
