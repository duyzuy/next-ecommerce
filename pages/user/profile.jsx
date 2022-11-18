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

import styles from '../../styles/user.module.scss';
const UserProfile = (props) => {
  const { session, profile } = props;
  const router = useRouter();
  const { query } = router;

  console.log(session, profile);
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
              <Acccountpage title="Thông tin tài khoản" data={profile} />
            )) || <></>}
            {(query.page === 'order' && (
              <OrderPage title="Đơn hàng" data={profile} />
            )) || <></>}
            {(query.page === 'address' && (
              <AddressPage title="Đơn hàng" data={profile} />
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
