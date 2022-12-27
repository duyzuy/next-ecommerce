import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from '../providers/hooks';

function Auth({ children, auth }) {
  const router = useRouter();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(auth.unauthorized);
    }
  });

  if (status === 'loading') {
    return <div>Check Auth permission...</div>;
  }

  return children;
}

export default Auth;
