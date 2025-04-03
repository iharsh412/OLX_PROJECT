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
