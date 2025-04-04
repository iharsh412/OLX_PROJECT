import api from '../../api';
import { Product } from '../../../../Shared/constant';

interface PaginationParams {
  page?: number;
  limit?: number;
  id?: number;
  category?: string;
}

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], PaginationParams>({
      query: ({ page, limit }) => ({
        url: `categories/listall/?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),
    getProductsDetail: builder.query<Product[], PaginationParams>({
      query: (params) => ({
        url: `categories/item`,
        method: 'GET',
        params,
      }),
    }),
    getWishlistProducts: builder.query<Product[], PaginationParams>({
      query: (params) => ({
        url: `categories/Favourites/`,
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
      query: ({ sampleData ,page,limit}) => ({
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
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetWishlistProductsQuery,
  useGetProductsDetailQuery,

  usePostProductsMutation,
  usePostCategoryProductsMutation,
  usePostNewProductsMutation,
} = productApi;
