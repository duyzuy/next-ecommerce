const NewCustomer = () => {
  return <>new cuss tomer page</>;
};

export default NewCustomer;
NewCustomer.auth = {
  role: 'customer',
  loading: 'loading...',
  unauthorized: '/user/login' // redirect to this url
};
