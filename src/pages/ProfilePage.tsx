import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { colors } from '../themes/colors';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { iconSizes } from '../themes/iconSizes';
import { useEffect, useState, useContext, useCallback } from 'react';
import { backendApi } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { formatName } from '../utils/formatName';

interface OrderItem {
    productId: string;
    quantity: number;
}

interface Order {
    order_id: number;
    order_number: number;
    user_id: number;
    created_at: string;
    items: OrderItem[];
}

export default function ProfilePage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const { user } = useContext(AuthContext);

    useFocusEffect(
        useCallback(() => {
            const loadOrders = async () => {
                try {
                    if (!user) {
                        return;
                    }

                    const response = await backendApi.get(`/orders/${user.id}`);
                    setOrders(response.data);
                } catch (error) {
                    console.log('Erro ao buscar pedidos:', error);
                }
            };
            loadOrders();
        }, [user]),
    );

    return (
        <View style={style.container}>
            <ScrollView>
                <View style={style.headerContainer}>
                    <MaterialIcons
                        name="catching-pokemon"
                        size={iconSizes.meddium}
                        style={style.headerIcon}
                    />
                    <Header text="TRAINER CARD" />
                    <MaterialIcons
                        name="catching-pokemon"
                        size={iconSizes.meddium}
                        style={style.headerIcon}
                    />
                </View>

                <View style={style.profileContainer}>
                    <Text style={style.idText}>ID: {user?.id}</Text>
                    <MaterialIcons name="account-box" size={170} />
                </View>

                <View style={style.infoContainer}>
                    <Text style={style.nameText}>Nome: {user?.name}</Text>
                    <Text style={style.emailText}>E-mail: {user?.email}</Text>
                </View>

                <View style={style.historyContainer}>
                    <Text style={style.historyTitle}>Histórico de Pedidos:</Text>
                    {orders.length === 0 ? (
                        <Text style={style.emptyText}>Sem histórico</Text>
                    ) : (
                        orders.map((order) => (
                            <View key={order.order_id} style={style.orderContainer}>
                                <Text style={style.orderTitle}>Pedido # {order.order_number}</Text>

                                <Text style={style.orderDate}>
                                    {new Date(order.created_at).toLocaleDateString('pt-BR')}
                                </Text>

                                {order.items.map((item, index) => (
                                    <View
                                        style={style.itemContainer}
                                        key={`${order.order_id}-${item.productId}-${index}`}>
                                        <Text style={style.productName}>
                                            {' '}
                                            ✦ {formatName(item.productId)}
                                        </Text>

                                        <Text style={style.quantity}>x{item.quantity}</Text>
                                    </View>
                                ))}
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightBackgroundSec,
    },
    headerIcon: {
        color: colors.white,
        paddingTop: 14,
    },
    headerContainer: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 40,
        paddingBottom: 10,
        backgroundColor: colors.primary,
    },
    profileContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    infoContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    idText: {
        fontSize: 14,
        fontWeight: 600,
        color: colors.primary,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 600,
    },
    emailText: {
        fontSize: 18,
        fontWeight: 600,
    },
    historyContainer: {
        width: '90%',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 20,
        margin: 20,
        borderRadius: 20,
        elevation: 3,
    },
    historyTitle: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 15,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 600,
        color: colors.gray,
    },
    orderContainer: {
        width: '90%',
        padding: 15,
        marginBottom: 15,
        borderTopWidth: 1,
    },
    orderTitle: {
        fontSize: 16,
        fontWeight: 600,
    },
    orderDate: {
        marginTop: 4,
        marginBottom: 12,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    productName: {
        fontSize: 15,
    },
    quantity: {
        fontSize: 15,
        fontWeight: 600,
    },
});
