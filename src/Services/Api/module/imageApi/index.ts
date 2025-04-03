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
    getProductsByCategory: builder.query({
      query: ({category}) => ({
        url: `categories/getbycategory/?category=${category}&page=0&limit=10&subcategory=cars`
      
      }),
    }),

    postProducts: builder.mutation({
      query: (data) => ({
        url: `categories/userfavourites/`,
        body: data,
        method: 'POST',
      }),
    }),
    postNewProducts: builder.mutation({
      query: (data) => ({
          url: `categories/putad/`,
          body: data,
          method: 'POST',
        })      
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetWishlistProductsQuery,
  useGetProductsDetailQuery,
  useGetProductsByCategoryQuery,
  usePostProductsMutation,
  usePostNewProductsMutation,
} = productApi;
