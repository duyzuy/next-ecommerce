import { useRouter } from 'next/router';

const classKey = {
  HOME: '',
  PRODUCT: 'product',
  PRODUCT_CAT: 'product-cat',
  POST: 'post',
  USER: 'user'
};
const useClasses = () => {
  const router = useRouter();

  const routerArr = router.pathname.split('/').splice(1);

  let classname = '';

  Object.keys(classKey).forEach((key) => {
    if (routerArr[0] === classKey[key]) {
      classname = classKey[key];
    } else if (routerArr[0] === '') {
      classname = 'home';
    }
  });

  return classname;
};

export default useClasses;
