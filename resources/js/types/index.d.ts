import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}
export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}
export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
interface BannerItem {
    id: number;
    image: string;
    title?: string;
    description?: string;
}

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    image: string;
    name: string;
    price: string | number;
    discountPrice?: string | number;
}

interface Testimonial {
    id: number;
    image: string;
    name: string;
    role: string;
    content: string;
    rating?: number;
}

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
  status: string;
  created_at?: string;
  updated_at?: string;
  description?: string;
  parent_id?: number | null;
  image?: string | null;
}


export interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    stock: number;
    description?: string;
    image?: string;
    image_url?: string;
    created_at?: string;
    updated_at?: string;
    category?: Category;
    category_id?: number;
    whatsapp_link?: string;
}

export interface Testimonial {
    id: number;
    image: string;
    name: string;
    role: string;
    content: string;
    rating?: number;
}


