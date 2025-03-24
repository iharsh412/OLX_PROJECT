import api from '../../api';
interface Product {
  id: number;
  imageUrl: string;
  price: React.ReactNode;
  images: string;
  name: string;
}

interface PaginationParams {
  start?: number;
  limit?: number;
}


export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], PaginationParams>({
      query: ({ start = 0, limit = 10 } = {}) => ({
        url: 'products',
        method: 'GET',
        params: { start, limit }, // Pass pagination parameters
      }),
    }),
      postProducts: builder.mutation({
        query: (data) => ({
          url: "products",
          body: data,
          method: "POST",
        })
      })
    }),
    overrideExisting: false,
  });

  export const { useGetProductsQuery, usePostProductsMutation } = productApi;
