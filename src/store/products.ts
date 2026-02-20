import { create } from 'zustand';
import api from '../api/client';

interface Product {
    id: number;
    name: string;
    final_price: string;
    image_url: string;
    category_id: number;
    stock_status: string;
}

interface ProductState {
    products: Product[];
    categories: any[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    fetchCategories: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    categories: [],
    loading: false,
    error: null,
    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.get('/products?limit=50');
            // Handle both { data: [...] } and [...] formats
            const list = Array.isArray(data) ? data : data.data || [];
            set({ products: list, loading: false });
        } catch (err: any) {
            set({ loading: false, error: err.message || 'Failed to fetch products' });
        }
    },
    fetchCategories: async () => {
        try {
            const { data } = await api.get('/categories');
            set({ categories: Array.isArray(data) ? data : [] });
        } catch (e) {
            console.error(e);
        }
    }
}));
