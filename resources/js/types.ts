export interface BannerItem {
  id: number;
  image: string;
  title?: string;
  description?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent_id?: number | null;
  status: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: number;
  image: string;
  name: string;
  price: string | number;
  discountPrice?: string | number;
}

export interface Testimonial {
  id: number;
  image: string;
  name: string;
  role: string;
  content: string;
}
