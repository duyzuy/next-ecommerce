import { useState } from 'react';
import { Container } from 'semantic-ui-react';
import { getSession } from 'next-auth/react';

import { getCustomerByEmail, getOrders } from '../../../api/customer';
import { useRouter } from 'next/router';

import styles from '../../../styles/user.module.scss';
import UserSidebar from '../../../container/Profile/UserSideBar';
import ProductItem from '../../../components/ProductItem';
const UserProfile = (props) => {
  const { session, profile, orders } = props;
  console.log(orders);
  const router = useRouter();

  const viewOrderDetail = async (id) => {
    alert(`view detail ${id}`);
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
                        viewOrderDetail={viewOrderDetail}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserProfile;
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
UserProfile.auth = {
  role: 'customer',
  loading: 'loading...',
  unauthorized: '/user/login' // redirect to this url
};
