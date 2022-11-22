import { useSession } from 'next-auth/react';
function Auth({ children }) {
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>Check Auth permission...</div>;
  }

  return children;
}

export default Auth;
