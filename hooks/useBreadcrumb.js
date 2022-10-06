import react, { useMemo } from 'react';
import { ROUTES } from '../constants/route';
import { isPathRoute } from '../utils/pathRoute';
const useBreadcrumb = (router) => {
  const items = useMemo(() => {
    let breadItems = [{ id: 'home', path: '/', name: 'Trang chủ' }];
    let pathName = router.pathname.split('/').slice(1);

    //hande product page
    const productPath = ROUTES.product.path.split('/').slice(1);
    if (isPathRoute(productPath, pathName)) {
      breadItems = [
        ...breadItems,
        {
          id: ROUTES.product.id,
          path: ROUTES.product.path,
          name: ROUTES.product.name
        }
      ];
    }
    //handle product detail

    console.log(pathName, productPath);
    //handle product cat
    // const productCatPath = ROUTES.productCatDetail.path.split('/').slice(1);
    // if (isPathRoute(productCatPath, pathName)) {
    //   breadItems = [
    //     ...breadItems,
    //     {
    //       id: ROUTES.productCatDetail.id,
    //       path: ROUTES.productCatDetail.path,
    //       name: ROUTES.productCatDetail.name
    //     }
    //   ];
    // }

    return breadItems;
  }, [router.pathname]);
  return {
    breadItems: items
  };
};

export { useBreadcrumb };
