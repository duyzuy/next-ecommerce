import { client } from '../../api/client';
import SEO from '../../components/common/Seo';
import { Container, Header, Grid, Image } from 'semantic-ui-react';
import styles from '../../styles/product.module.scss';
import Card from '../../components/Card';
const Product = (props) => {
  const { products } = props;
  console.log(products);

  return (
    <>
      <SEO title="Bep tu nhap khau" description="bep tu nhap khau chinh hang" />
      <div className={styles.ec__product}>
        <Container>
          <div className="ec__product--header">
            <Header as="h1">Sản phẩm</Header>
          </div>
          <div className="ec__product--container">
            <div className="ec__product--sidebar">this is sidebar</div>
            <div className="ec__product--list">
              <div className="ec__product--tools">this is tool</div>
              <div className="ec__product--items">
                <Grid columns={3}>
                  <Grid.Row>
                    {products &&
                      products.data.map((prd) => (
                        <Grid.Column>
                          <Card key={prd.id} type="product" data={prd} />
                        </Grid.Column>
                      ))}
                  </Grid.Row>
                </Grid>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Product;

export async function getServerSideProps(context) {
  const response = await client(
    `${process.env.BASE_API_URL}/product?perPage=40&page=3`,
    {}
  )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: { products: response }
  };
}
