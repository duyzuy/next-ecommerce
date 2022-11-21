import { useState } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';

import { PROFILE_ROUTES } from '../../constants/route';
import { getCustomerByEmail } from '../../api/customer';
import { useRouter } from 'next/router';
import SignOutButton from '../../components/SignOutButton';

import OrderPage from '../../container/Profile/OrderPage';
import Acccountpage from '../../container/Profile/AccountPage';
import AddressPage from '../../container/Profile/AddressPage';
import { client } from '../../api/client';
import styles from '../../styles/user.module.scss';
const UserProfile = (props) => {
  const { session, profile } = props;
  const router = useRouter();
  const { query } = router;
  const [userProfile, setUserProfile] = useState(profile);

  const handleUpdateUserInfor = async (type, data) => {
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
  };
  return (
    <Container>
      <div className={styles.auth__wrapper}>
        <div className="auth--sidebar">
          <div className="auth-avt">
            <div className="auth-avt-image">
              <img src={profile.avatar_url} width={60} height={60} />
            </div>
            <div className="auth-account"> {session?.user?.name}</div>
          </div>
          <div className="auth--menu">
            <ul>
              {PROFILE_ROUTES.map((route) => (
                <li key={route.id}>
                  <Link href={route.path}>
                    <a
                      className={`
                    ${
                      router.asPath === route.path
                        ? 'nav-link active'
                        : 'nav-link'
                    }`}
                    >
                      {route.name}
                    </a>
                  </Link>
                </li>
              ))}
              <li>
                <SignOutButton classes="item"></SignOutButton>
              </li>
            </ul>
          </div>
        </div>

        <div className="auth--body">
          <div className="auth--wrapper">
            {((query.page === 'account' || query.page === undefined) && (
              <Acccountpage
                title="Thông tin tài khoản"
                data={userProfile}
                onUpdateUserInfor={handleUpdateUserInfor}
              />
            )) || <></>}
            {(query.page === 'order' && (
              <OrderPage title="Đơn hàng" data={userProfile} />
            )) || <></>}
            {(query.page === 'address' && (
              <AddressPage
                title="Địa chỉ thông tin"
                data={userProfile}
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

  return {
    props: { session, profile }
  };
}
UserProfile.auth = {
  role: 'customer',
  loading: 'loading...',
  unauthorized: '/user/login' // redirect to this url
};
