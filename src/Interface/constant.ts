export interface Product {
  is_favourite?: boolean;
  id: number;
  name: string;
  price: React.ReactNode;
  display_photo?: string;
  category?: React.ReactNode;
  city?: React.ReactNode;
  district?: React.ReactNode;
  state?: React.ReactNode;
  images?: string;
  status?: React.ReactNode;
  subcategory?: React.ReactNode;
  user?: React.ReactNode;
  description?: React.ReactNode;
  created_at?: React.ReactNode;
 
}
export interface PaginationParams {
  search?: string | null;
  page?: number;
  limit?: number;
  id?: number;
  category?: string;
}
export interface ImageProps {
  data: {
    created_at?: React.ReactNode;
    id: number;
    name: string;
    price: React.ReactNode;
    display_photo?: string | null;
    category?: React.ReactNode;
    city?: React.ReactNode;
    district?: React.ReactNode;
    state?: React.ReactNode;
    status?: React.ReactNode;
    subcategory?: React.ReactNode;
    user?: React.ReactNode;
    is_favourite?: boolean;
  };
  refetch?: () => void;
  refetchDashboard?: () => void;
}

export const COMMON_TEXT ={
  IMG:"img",
  BUTTON:"button",
  NUMBER:"number",
  ERROR:"Error in loading products",
  LOADING:"Loading products...",
  NO_PRODUCTS:"No items found for your current search. Let’s try something else!",
  SENDING:"Sending...",
  EMAIL:"Email",
  EMAIL_S:"email",
  PASSWORD:"Password",
  PASSWORD_S:"password",
  TEXT:"text",
  SUBMIT:"submit",
  CONFIRM_PASSWORD_S:"confirmPassword",
  LOGIN_TO_CHAT:"Login to chat",
  DAYS_AGO:"days ago",
  NO_WISHLIST:"No items saved yet. When you find something you love, click the heart icon to add it here.",
  


  
}
export const TYPE ={
  EMAIL:"email" as "email",
  PASSWORD:"password" as "password",
  TEXT:"text" as "text",
  SUBMIT:"submit" as "submit",
  BUTTON:"button" as "button",
  NUMBER:"number" as "number",

}