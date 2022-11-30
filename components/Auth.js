import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
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

  return children;
}

export default Auth;
