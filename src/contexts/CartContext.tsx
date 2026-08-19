import React, { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backendApi } from '../services/api';
import axios from 'axios';
import { prices } from '../data/prices';
import { AuthContext } from './AuthContext';

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
    decrease: (name: string) => Promise<void>;
    getQuantity: (name: string) => number;
    clearCart: () => void;
    totalItems: number;
    addToCart: (product: { name: string; price: number }, amount?: number) => Promise<void>;
}

export const CartContext = createContext({} as CartContextData);

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const { user } = useContext(AuthContext);

    async function getToken() {
        const token = await AsyncStorage.getItem('@pokestop:token');

        return token;
    }

    async function getUserId() {
        return await AsyncStorage.getItem('@pokestop:userId');
    }

    async function loadCart() {
        const token = await getToken(); //Recuperando o JWT
        const userId = await getUserId();

        console.log('ID do usuário:', userId);

        if (!token || !userId) {
            setCart([]);
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
        if (!user) {
            setCart([]);
            return;
        }
        loadCart();
    }, [user]);

    async function addToCart(product: { name: string; price: number }, amount: number = 1) {
        console.log('AddToCart foi executado');
        const token = await getToken();

        if (!token) {
            return;
        }

        try {
            const response = await backendApi.post(
                '/cart',
                { productId: product.name, quantity: amount },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            increase(product, amount);
        } catch (error) {
            console.error('Erro ao adicionar produto ao carrinho:', error);
        }
    }

    function clearCart() {
        console.log('ClearCart foi executado.');
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

    async function decrease(name: string) {
        const itemExists = cart.find((item) => item.name === name);
        if (!itemExists) {
            return;
        }

        const token = await getToken();

        if (!token) {
            return;
        }

        try {
            if (itemExists.quantity === 1) {
                await backendApi.delete(`/cart/${itemExists.name}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCart(cart.filter((item) => item.name !== name));
                return;
            }
            const newQuantity = itemExists.quantity - 1;

            await backendApi.patch(
                `/cart/${itemExists.name}`,
                {
                    quantity: newQuantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setCart(
                cart.map((item) =>
                    item.name === name
                        ? {
                              ...item,
                              quantity: newQuantity,
                          }
                        : item,
                ),
            );
        } catch (error) {
            console.error('Erro ao diminuir quantidade:', error);
        }
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
                addToCart,
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
