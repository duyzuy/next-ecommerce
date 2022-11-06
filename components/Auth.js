import { useSession } from 'next-auth/react';
function Auth({ children }) {
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>Auth Loading...</div>;
  }
  console.log(status);
  return children;
}

export default Auth;
