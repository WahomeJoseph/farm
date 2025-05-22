import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : []
    },
    reducers: {
        addItem: (state, action) => {
            const product = action.payload
            const existingItem = state.items.find((items) => items.id === product.id)
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push(
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        weight: product.weight,
                        image: product.image,
                        description: product.description,
                        quantity: 1,
                    }
                )
            }
            if (!product.id || !product.name || typeof product.price !== 'number') {
                console.error('Invalid item:', action.payload);
                return state;
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item && quantity >= 1) {
                item.quantity = Number(quantity);
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeItem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = []
            localStorage.setItem('cart', JSON.stringify(state.items));
        }
    }
})

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer