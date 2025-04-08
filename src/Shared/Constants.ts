const STRING: string = 'Test';
export { STRING };

const ROUTES = {
  HOMEPAGE: '/',
  LOGIN: 'login',
  LOGIN_PHONE: 'loginPhone',
  LOGIN_PHONE_SMS: 'loginphonesms',
  CART: 'cart',
  PRODUCT: 'product/:productName/:productId',
  SELL: 'sell',
  ATTRIBUTES: 'attributes',
  CATEGORY:'/:category'


};

const WILDCARD_ROUTES = {
  PUBLIC: ROUTES.HOMEPAGE,
  PRIVATE: ROUTES.LOGIN,
};

const ROUTES_CONFIG = {
  HOMEPAGE: {
    path: ROUTES.HOMEPAGE,
    title: 'Homepage',
  },
  LOGIN: {
    path: ROUTES.LOGIN,
    title: 'Login',
  },
  LOGIN_PHONE: {
    path: ROUTES.LOGIN_PHONE,
    title: 'Login Phone',
  },
  LOGIN_PHONE_SMS: {
    path: ROUTES.LOGIN_PHONE_SMS,
    title: 'Login Phone Sms',
  },
  CART: {
    path: ROUTES.CART,
    title: 'Cart',
  },
  PRODUCT: {
    path: ROUTES.PRODUCT,
    title: 'Product',
  },
  SELL: {
    path: ROUTES.SELL,
    title: 'Sell',

  },
  ATTRIBUTES: {
    path: ROUTES.ATTRIBUTES,
    title: 'Attributes',
  },
  CATEGORY: {
    path: ROUTES.CATEGORY,
    title: 'Category',
    },



};

export { ROUTES, WILDCARD_ROUTES, ROUTES_CONFIG };
