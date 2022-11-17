import { Container, Header } from 'semantic-ui-react';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from '../../styles/user.module.scss';
import { PROFILE_ROUTES } from '../../constants/route';
const UserProfile = (props) => {
  const { session } = props;

  console.log(session);
  return (
    <Container>
      <div className={styles.auth__wrapper}>
        <div className="auth--sidebar">
          <div className="auth-avt">{session?.user?.name}</div>
          {(session?.user?.image && (
            <img src={session?.user?.image} width={40} height={40} />
          )) || <></>}
          <div className="auth--menu">
            <ul>
              {PROFILE_ROUTES.map((route) => (
                <li key={route.id}>
                  <Link href={route.path}>
                    <a>{route.name}</a>
                  </Link>
                </li>
              ))}
              <li>
                <button>Đăng xuất</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="auth--body">this is body</div>
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

  return {
    props: { session }
  };
}
UserProfile.auth = {
  role: 'customer',
  loading: 'loading...',
  unauthorized: '/user/login' // redirect to this url
};
