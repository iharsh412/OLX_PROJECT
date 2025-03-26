import api from '../../api';
interface Product {
  id: number;
  imageUrl: string;
  price: React.ReactNode;
  images: string;
  name: string;
}

interface PaginationParams {
  page?: number;
  limit?: number;
  id?: number;
}

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], PaginationParams>({
      query: ({page, limit}) => ({
        url: `categories/listall/?page=${page}&limit=${limit}`,
        method: 'GET',
        
      }),
    }),
    getWishlistProducts: builder.query<Product[], PaginationParams>({
      query: (params) => ({
        url: `categories/Favourites/`,      
        params
      }),
    }),
    postProducts: builder.mutation({
      query: (data) => ({
        url: `categories/userfavourites/`,
        body: data,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery,useGetWishlistProductsQuery, usePostProductsMutation } = productApi;
