import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, all?: boolean) => void;
    updateQuantity: (id: string, qty: number) => void;
    clearCart: () => void;
    total: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => set((state) => {
                const existing = state.items.find((i) => i.id === item.id);
                if (existing) {
                    return {
                        items: state.items.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                    };
                }
                return { items: [...state.items, { ...item, quantity: 1 }] };
            }),
            removeItem: (id, all = false) => set((state) => {
                if (all) {
                    return { items: state.items.filter((i) => i.id !== id) };
                }
                const existing = state.items.find(i => i.id === id);
                if (existing && existing.quantity > 1) {
                    return { items: state.items.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i) };
                }
                return { items: state.items.filter((i) => i.id !== id) };
            }),
            updateQuantity: (id, qty) => set((state) => ({
                items: state.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
            })),
            clearCart: () => set({ items: [] }),
            total: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }),
        {
            name: 'cart-storage', // unique name
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
