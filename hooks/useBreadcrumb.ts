import { NextRouter } from 'next/router';
import React from 'react';
import react, { useMemo } from 'react';
import { ROUTES } from '../constants/route';
import { isPathRoute } from '../utils/pathRoute';
import { BreadcrumbItemType } from '../model';

const useBreadcrumb = (router: NextRouter): BreadcrumbItemType[] => {
  const items = useMemo(() => {
    let breadItems: BreadcrumbItemType[] = [
      { id: 'home', path: '/', name: 'Trang chủ' }
    ];
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
    const postPath = ROUTES.post.path.split('/').slice(1);
    if (isPathRoute(postPath, pathName)) {
      breadItems = [
        ...breadItems,
        {
          id: ROUTES.post.id,
          path: ROUTES.post.path,
          name: ROUTES.post.name
        }
      ];
    }
    //handle product detail

    // console.log(pathName, productPath);
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

  return items;
};

export { useBreadcrumb };
