import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from '../providers/hooks';
import { client } from '../api/client';
import { useEffect } from 'react';

function Auth({ children, auth }) {
  const router = useRouter();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(auth.unauthorized);
    }
  });

  // console.log({ router, status, auth, session });
  if (status === 'loading') {
    return <div>Check Auth permission...</div>;
  }

  useEffect(() => {
    if (session) {
      (async () => {
        const response = await client.get('/user', {
          email: session.user.email
        });
        console.log(response);
      })();
    }
  }, []);
  return children;
}

export default Auth;
