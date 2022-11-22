import { useState } from 'react';
import { Container } from 'semantic-ui-react';
import { getSession } from 'next-auth/react';

import { getCustomerByEmail, getOrders } from '../../api/customer';
import { useRouter } from 'next/router';

import OrderPage from '../../container/Profile/OrderPage';
import Acccountpage from '../../container/Profile/AccountPage';
import AddressPage from '../../container/Profile/AddressPage';
import { client } from '../../api/client';
import styles from '../../styles/user.module.scss';
import UserSidebar from '../../container/Profile/UserSideBar';
const UserProfile = (props) => {
  const { session, profile, orders } = props;
  console.log(orders);
  const router = useRouter();
  const { query } = router;
  const [userProfile, setUserProfile] = useState(profile);
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdateUserInfor = async (type, data, callback) => {
    setIsLoading(true);
    let result;
    if (type === 'account') {
      // const result = await updateCustomer(profile.id, { payload: data });
      result = await client.post(`/customer/${profile.id}/update`, {
        ...data
      });
    } else {
      result = await client.post(`/customer/${profile.id}/update`, {
        [type]: { ...data }
      });
    }

    if (result.status === 200) {
      setUserProfile(() => ({
        ...result.data
      }));
    }
    setIsLoading(false);
    if (typeof callback === 'function' && callback !== undefined) {
      callback();
    }
  };

  return (
    <Container>
      <div className={styles.auth__wrapper}>
        <UserSidebar profile={profile} router={router} session={session} />
        <div className="auth--body">
          <div className="auth--wrapper">
            {((query.page === 'account' || query.page === undefined) && (
              <Acccountpage
                title="Thông tin tài khoản"
                isLoading={isLoading}
                data={userProfile}
                onUpdateUserInfor={handleUpdateUserInfor}
              />
            )) || <></>}
            {(query.page === 'address' && (
              <AddressPage
                title="Địa chỉ"
                data={userProfile}
                isLoading={isLoading}
                onUpdateUserInfor={handleUpdateUserInfor}
              />
            )) || <></>}
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
