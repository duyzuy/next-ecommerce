import { useState } from 'react';
import { Container } from 'semantic-ui-react';
import { getSession } from 'next-auth/react';

import { getCustomerByEmail, getOrders } from '../../../api/customer';
import { useRouter } from 'next/router';

import styles from '../../../styles/user.module.scss';
import UserSidebar from '../../../container/Profile/UserSideBar';
import ProductItem from '../../../components/ProductItem';
import { client } from '../../../api/client';
import EcModal from '../../../components/Modal';
import OrderDetail from '../../../components/OrderDetail';
import { useDispatch, useSelector } from '../../../providers/hooks';
const OrderPage = (props) => {
  const { session, profile, orders } = props;
  const [orderDetail, setOrderDetail] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  const router = useRouter();

  const onViewOrderDetail = async (id) => {
    const response = await client.get(`order/${id}`);
    console.log(response);
    if (response.status === 'oke') {
      setIsShowModal(true);
      setOrderDetail(response.data);
    }
  };

  return (
    <Container>
      <div className={styles.auth__wrapper}>
        <UserSidebar profile={profile} router={router} session={session} />
        <div className="auth--body">
          <div className="auth--wrapper">
            <div className="account-page">
              <div className="section-header">
                <h3>Lịch sử mua hàng</h3>
              </div>
              <div className="section-content">
                <div className="inner-section">
                  {orders &&
                    orders.map((order) => (
                      <ProductItem
                        key={order.id}
                        item={order}
                        onViewOrderDetail={onViewOrderDetail}
                      />
                    ))}

                  <EcModal
                    title={`Chi tiết đơn hàng #${orderDetail.orderId}`}
                    render={() => <OrderDetail data={orderDetail} />}
                    isShow={isShowModal}
                    onClose={() => setIsShowModal(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderPage;

OrderPage.auth = {
  role: 'customer',
  loading: 'loading...',
  unauthorized: '/user/login' // redirect to this url
};

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
