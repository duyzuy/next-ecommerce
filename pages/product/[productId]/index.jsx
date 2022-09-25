import { useRouter } from 'next/router';
import { isEmpty, isExists } from '../../../utils/helper';
import { client } from '../../../api/client';
import { Container } from 'semantic-ui-react';
const ProductDetail = (props) => {
  const router = useRouter();
  console.log(router);
  return (
    <div className="ec__wrapper single-product">
      <Container>single product</Container>
    </div>
  );
};

export default ProductDetail;

export async function getServerSideProps(context) {
  const { params } = context;
  const response = await client(
    `${process.env.BASE_API_URL}/product/${params.productId}`
  )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    props: { product: response }
  };
}
