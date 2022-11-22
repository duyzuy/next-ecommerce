import { getSession } from 'next-auth/react';
import { getOrders } from '../../../api/customer';
const OrderPage = () => {
  return <>order page</>;
};

export default OrderPage;
export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });

  if (!session) {
    return {
      redirect: {
        destination: '/user/login',
        permanent: false
      }
    };
  }

  const profile = await getCustomerByEmail(session.user.email);

  const orders = await getOrders({
    customer: profile.id
  });

  return {
    props: { session, profile, orders }
  };
}

OrderPage.auth = {
  role: 'customer',
  loading: 'loading...',
  unauthorized: '/user/login' // redirect to this url
};
