import React, { createContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backendApi } from '../services/api';
import axios from 'axios';
import { prices } from '../data/prices';

interface CartItem {
    name: string;
    price: number;
    quantity: number;
}

interface CartApiItem {
    id: number;
    product_id: string;
    quantity: number;
}

interface CartContextData {
    cart: CartItem[];
    increase: (product: { name: string; price: number }, amount?: number) => void;
    decrease: (name: string) => void;
    getQuantity: (name: string) => number;
    clearCart: () => void;
    totalItems: number;
}

export const CartContext = createContext({} as CartContextData);

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<CartItem[]>([]);

    async function getToken() {
        const token = await AsyncStorage.getItem('@pokestop:token');

        return token;
    }

    async function loadCart() {
        console.log('LoadCart foi executado.');
        const token = await getToken(); //Recuperando o JWT
        console.log('Token está retornando?', token ? 'Sim' : 'Não');

        if (!token) {
            //Se o usuário não estiver autenticado, não realiza a requisição
            return;
        }
        try {
            const response = await backendApi.get<CartApiItem[]>('/cart', {
                headers: {
                    Authorization: `Bearer ${token}`, //Aqui o authMiddleware identifica o usuário, igual se faz no postman
                },
            });

            console.log('Carrinho recebido pela API:', response.data);

            const cartItems: CartItem[] = response.data.map((item) => ({
                name: item.product_id,
                price: prices[item.product_id],
                quantity: item.quantity,
            }));

            console.log('Carrinho convertido:', cartItems);

            setCart(cartItems);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Status:', error.response?.status);
                console.error('Resposta da API:', error.response?.data);
                console.error('URL:', error.config?.url);
                console.error('Método:', error.config?.method);
            } else {
                console.error('Erro:', error);
            }
        }
    }

    useEffect(() => {
        console.log('CartProvider foi montado');
        loadCart();
    }, []);

    function clearCart() {
        setCart([]);
    }

    function increase(product: { name: string; price: number }, amount: number = 1) {
        const itemExists = cart.find((item) => item.name === product.name);
        if (itemExists) {
            setCart(
                cart.map((item) =>
                    item.name === product.name
                        ? {
                              ...item,
                              quantity: Math.min(item.quantity + amount, 99),
                          }
                        : item,
                ),
            );

            return;
        }
        setCart([
            ...cart,
            {
                name: product.name,
                price: product.price,
                quantity: Math.min(amount, 99),
            },
        ]);
    }
    function decrease(name: string) {
        const itemExists = cart.find((item) => item.name === name);
        if (!itemExists) {
            return;
        }
        if (itemExists.quantity === 1) {
            setCart(cart.filter((item) => item.name !== name));
            return;
        }
        setCart(
            cart.map((item) =>
                item.name === name
                    ? {
                          ...item,
                          quantity: item.quantity - 1,
                      }
                    : item,
            ),
        );
    }
    function getQuantity(name: string) {
        const item = cart.find((item) => item.name === name);
        return item ? item.quantity : 0;
    }
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                increase,
                decrease,
                getQuantity,
                clearCart,
                totalItems,
            }}>
            {children}
        </CartContext.Provider>
    );
}
