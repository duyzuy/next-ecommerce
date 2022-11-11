import { useSession } from 'next-auth/react';
function Auth({ children }) {
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>Auth Loading...</div>;
  }

  return children;
}

export default Auth;
