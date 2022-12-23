import { useState, useEffect } from 'react';
import { isPayment } from '../../constants/booking';
const PaymentPage = () => {
  return <>payment page</>;
};
export default PaymentPage;
// export async function getServerSideProps(ctx) {
//   const session = await getSession({ req: ctx.req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/user/login',
//         permanent: false
//       }
//     };
//   }

//   const profile = await getCustomerByEmail(session.user.email);

//   const orders = await getOrders({
//     customer: profile.id
//   });

//   return {
//     props: { session, profile, orders }
//   };
// }
PaymentPage.booking = {
  loading: 'loading...',
  redirect: '/cart' // redirect to this url
};
