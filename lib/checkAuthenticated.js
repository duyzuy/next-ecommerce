import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';

const checkAuthenticated = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    return true;
  }
  return false;
};

export default checkAuthenticated;
