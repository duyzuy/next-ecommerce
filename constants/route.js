export const ROUTES = {
  home: {
    id: 'home',
    name: 'Trang chủ',
    path: '/'
  },
  product: {
    id: 'product',
    name: 'Sản phẩm',
    path: '/product'
  },
  productCat: {
    id: 'productCat',
    name: 'Danh mục sản phẩm',
    path: '/product-cat'
  },
  productCatDetail: {
    id: 'productCatDetail',
    name: 'Danh mục sản phẩm',
    path: '/product-cat/[slug]'
  },
  post: {
    id: 'post',
    name: 'Post',
    path: '/post'
  },
  page: {
    id: 'page',
    name: 'Page',
    path: '/page'
  }
};

export const PROFILE_ROUTES = [
  {
    id: 'account',
    name: 'Tài khoản',
    path: '/user/account'
  },
  {
    id: 'order',
    name: 'Đơn hàng',
    path: '/user/account'
  },
  {
    id: 'address',
    name: 'Địa chỉ',
    path: 'user/address'
  }
];
