import { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { getSession } from 'next-auth/react';

import { getCustomerByEmail, getOrders } from '../../api/customer';
import { useRouter } from 'next/router';

import Acccountpage from '../../container/Profile/AccountPage';
import AddressPage from '../../container/Profile/AddressPage';
import { client } from '../../api/client';
import styles from '../../styles/user.module.scss';
import UserSidebar from '../../container/Profile/UserSideBar';
import { UPDATE_USER_DATA } from '../../constants/actions';
import { useDispatch, useSelector } from '../../providers/hooks';
import { isEmpty } from '../../utils/helper';
const UserProfile = (props) => {
  const { session, orders } = props;

  const router = useRouter();
  const { query } = router;

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const handleUpdateUserInfor = async (type, data, callback) => {
    setIsLoading(true);
    let result;
    if (type === 'account') {
      result = await client.post(`/customer/${userData.userId}/update`, {
        first_name: data.firstName,
        last_name: data.lastName
      });
    } else {
      result = await client.post(`/customer/${userData.userId}/update`, {
        [type]: {
          ...data,
          address_1: data.address1,
          address_2: data.address2,
          first_name: data.firstName,
          last_name: data.lastName
        }
      });
    }

    if (result.status === 200) {
      dispatch({
        type: UPDATE_USER_DATA,
        payload: { type, data: { ...result.data } }
      });
    }
    setIsLoading(false);
    if (typeof callback === 'function' && callback !== undefined) {
      callback();
    }
  };

  return (
    <Container>
      <div className={styles.auth__wrapper}>
        <UserSidebar profile={userData} router={router} />
        <div className="auth--body">
          <div className="auth--wrapper">
            {((query.page === 'account' || query.page === undefined) && (
              <Acccountpage
                title="Thông tin tài khoản"
                isLoading={isLoading}
                data={userData}
                onUpdateUserInfor={handleUpdateUserInfor}
              />
            )) || <></>}
            {(query.page === 'address' && (
              <AddressPage
                title="Địa chỉ"
                data={userData}
                isLoading={isLoading}
                onUpdateUserInfor={handleUpdateUserInfor}
              />
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

  // const profile = await getCustomerByEmail(session.user.email);

  // const orders = await getOrders({
  //   customer: profile.id
  // });

  return {
    props: { session }
  };
}
UserProfile.auth = {
  role: 'customer',
  loading: 'loading...',
  unauthorized: '/user/login' // redirect to this url
};
