import { Container, Header } from 'semantic-ui-react';
import { getSession, useSession } from 'next-auth/react';
import styles from '../../styles/user.module.scss';

const UserProfile = () => {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <Container>
      <div className={styles.auth__wrapper}>
        <Header>{session.user.name}</Header>
      </div>
    </Container>
  );
};

export default UserProfile;
export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });

  return {
    props: { session }
  };
}
UserProfile.auth = {
  role: 'customer',
  loading: 'loading...',
  unauthorized: '/user/login' // redirect to this url
};
