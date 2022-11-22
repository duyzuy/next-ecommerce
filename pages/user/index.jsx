const UserPage = () => {
  return <>user page</>;
};
export default UserPage;
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
UserPage.auth = {
  role: 'customer',
  loading: 'loading...',
  unauthorized: '/user/login' // redirect to this url
};
