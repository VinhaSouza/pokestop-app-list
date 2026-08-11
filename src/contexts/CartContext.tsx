import React, { createContext, ReactNode, useState } from 'react';

interface CartItem {
    name: string;
    price: number;
    quantity: number;
}

interface CartContextData {
    cart: CartItem[];
    increase : (product: {name: string, price: number}) => void;
    decrease : (name: string) => void;
    getQuantity: (name: string) => number;
    clearCart: () => void;
    totalItems: number;
}

export const CartContext = createContext({} as CartContextData);

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({children}: CartProviderProps) {
    const [cart, setCart] = useState<CartItem[]>([]);
    
    function clearCart() {
        setCart([]);
    };

    function increase(product: {name: string, price: number}){
        const itemExists = cart.find(item => item.name === product.name);
        if (itemExists) {
            setCart(cart.map(item =>
                item.name === product.name
                ? {
                    ...item,
                    quantity: item.quantity + 1
                } 
                : item
            ));

            return;
        }
        setCart([
            ...cart,
            {
                name: product.name,
                price: product.price,
                quantity: 1
            }
        ]);
    }
    function decrease(name: string) {
        const itemExists = cart.find(item => item.name === name);
        if (!itemExists) {
            return;
        }
        if (itemExists.quantity === 1) {
            setCart(cart.filter(item => item.name !== name));
            return;
        }
        setCart(
            cart.map(item =>
                item.name === name
                ? {
                    ...item,
                    quantity: item.quantity - 1
                }
                : item
            )
        );
    }
    function getQuantity(name: string) {
        const item = cart.find(item => item.name === name);
        return item? item.quantity: 0;
    }
    const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                increase,
                decrease,
                getQuantity,
                clearCart,
                totalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}