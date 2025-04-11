import api from '../../api';
import { Product } from '../../../../Interface/constant';

interface PaginationParams {
  search?: string | null;
  page?: number;
  limit?: number;
  id?: number;
  category?: string;
}

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTypeProducts: builder.query<Product[], PaginationParams>({
      query: ({ page, limit, search }) => ({
        url: `categories/list/?page=${page}&limit=${limit}&search=${search}`,
        method: 'GET',
      }),
    }),
    getListALLProducts: builder.query<Product[], PaginationParams>({
      query: ({ page, limit }) => ({
        url: `categories/listall/?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),

    getProductsDetail: builder.query({
      query: (params) => ({
        url: `categories/item`,
        method: 'GET',
        params,
      }),
    }),
    getWishlistProducts: builder.query<Product[], PaginationParams>({
      query: (params) => ({
        url: `categories/Favourites`,
        method: 'GET',
        params,
      }),
    }),
    postProducts: builder.mutation({
      query: (data) => ({
        url: `categories/userfavourites/`,
        body: data,
        method: 'POST',
      }),
    }),
    postCategoryProducts: builder.mutation({
      query: ({ sampleData, page, limit }) => ({
        url: `categories/filters/?page=${page}&limit=${limit}`,
        body: sampleData,
        method: 'POST',
      }),
    }),
    postNewProducts: builder.mutation({
      query: (data) => ({
        url: `categories/putad/`,
        body: data,
        method: 'POST',
      }),
    }),
    postSignupData: builder.mutation({
      query: (data) => ({
        url: `account/signup/`,
        body: data,
        method: 'POST',
      }),
    }),
    postForgetPasswordData: builder.mutation({
      query: (data) => ({
        url: `account/forgotpass/`,
        body: data,
        method: 'POST',
      }),
    }),
    // change password
    postChangePasswordData: builder.mutation({
      query: (data) => ({
        url: `account/changepass/`,
        body: data,
        method: 'POST',
      }),
    }),
    //  login
    postSigninData: builder.mutation({
      query: (data) => ({
        url: `account/login/`,
        body: data,
        method: 'POST',
      }),
    }),
      // logout
    postLogoutData: builder.mutation({
      query: (data) => ({
        url: `account/logout/`,
        body: data,
        method: 'POST',
      }),
    }),
    // user ads 
    getAdsData: builder.query({
      query: () => ({
        url: `categories/userads/`,
        method: 'GET',
       
      }),
    }),
    // deletd ads
    getDeleteAds: builder.query({
      query: (params) => ({
        url: `categories/removead/`,
        method: 'GET',
        params
      }),
    }),
    // postChechRefreshTokenData: builder.mutation({
    //   query: (data) => ({
    //     url: `account/refresh/`,
    //     body: data,
    //     method: 'POST',
    //   }),
    // }),
    // getCheckTokenData: builder.query({
    //   query: (data) => ({
    //     url: `account/sell`,
    //     method: 'GET',
    //     data,
    //   }),
    // }),
  }),
  overrideExisting: false,
});

export const {
  useGetTypeProductsQuery,
  useGetListALLProductsQuery,
  useGetWishlistProductsQuery,
  useGetProductsDetailQuery,
  usePostSignupDataMutation,
  usePostSigninDataMutation,
  usePostProductsMutation,
  usePostCategoryProductsMutation,
  usePostNewProductsMutation,
  usePostChangePasswordDataMutation,
  usePostForgetPasswordDataMutation,
  usePostLogoutDataMutation,
  useGetAdsDataQuery,
  useLazyGetDeleteAdsQuery
  // useGetCheckTokenDataQuery,
  // usePostChechRefreshTokenDataMutation,
} = productApi;
