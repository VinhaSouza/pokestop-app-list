import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { ButtonIcon } from '../components/ButtonIcon';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { CartContext } from '../contexts/CartContext';
import { FlatList } from 'react-native-gesture-handler';
import { colors } from '../themes/colors';
import { formatName } from '../utils/formatName';
import { Button } from '../components/Button';
import { iconSizes } from '../themes/iconSizes';
import { SafeAreaView } from 'react-native-safe-area-context';
import ClearCartModal from '../components/ClearCartModal';

export default function ShoppingCartPage() {
    const { cart, clearCart, addToCart, decrease } = useContext(CartContext);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const navigation = useNavigation<NavigationProp<any>>();
    const [clearCartModalVisible, setClearCartModalVisible] = useState(false);
    const handleClearCart = async () => {
        clearCart();
        setClearCartModalVisible(false);
    };

    return (
        <SafeAreaView style={style.container}>
            <ScrollView style={style.scrollView}>
                <View style={style.containerHeader}>
                    <ButtonIcon
                        text=""
                        onPress={() => navigation.navigate('List')}
                        icon={
                            <MaterialIcons
                                name="arrow-back"
                                size={iconSizes.meddium}
                                style={style.iconStyle}
                            />
                        }
                    />

                    <Header text="Seu Carrinho" />

                    <ButtonIcon
                        text=""
                        onPress={() => navigation.navigate('List')}
                        icon={
                            <MaterialIcons
                                name="account-circle"
                                size={iconSizes.meddium}
                                style={style.iconStyle}
                            />
                        }
                    />
                </View>
                {cart.length === 0 ? (
                    <View style={style.emptyCartBox}>
                        <Text style={style.emptyCartText}>Carrinho vazio</Text>
                        <MaterialIcons
                            name="remove-shopping-cart"
                            size={iconSizes.large}
                            style={style.emptyIcon}
                        />
                    </View>
                ) : (
                    <View style={style.listContainer}>
                        <FlatList
                            data={cart}
                            keyExtractor={(item) => item.name}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <View style={style.dataCard}>
                                    <Text style={style.itemName}>{formatName(item.name)}</Text>

                                    <View style={style.countBox}>
                                        <Text style={style.countTitle}>Quantidade:</Text>
                                        <View style={style.counter}>
                                            <ButtonIcon
                                                text=""
                                                onPress={() => addToCart(item)}
                                                icon={
                                                    <MaterialIcons
                                                        style={style.buttons}
                                                        name="add"
                                                        size={iconSizes.meddium}
                                                    />
                                                }
                                            />

                                            <Text style={style.itemQnt}>{item.quantity}</Text>

                                            <ButtonIcon
                                                text=""
                                                onPress={() => decrease(item.name)}
                                                icon={
                                                    <MaterialIcons
                                                        style={style.buttons}
                                                        name="remove"
                                                        size={iconSizes.meddium}
                                                    />
                                                }
                                            />
                                        </View>
                                    </View>

                                    <Text style={style.itemPrice}>
                                        Preço unitário: G {item.price}
                                    </Text>
                                    <Text style={style.itemTotal}>
                                        Total: G {item.price * item.quantity}
                                    </Text>
                                </View>
                            )}
                        />
                        <Button
                            style={style.clearButton}
                            text="Limpar o Carrinho"
                            onPress={() => setClearCartModalVisible(true)}
                        />

                        <ClearCartModal
                            visible={clearCartModalVisible}
                            onCancel={() => setClearCartModalVisible(false)}
                            onConfirm={handleClearCart}
                        />
                    </View>
                )}
            </ScrollView>
            <View style={style.footer}>
                <Text style={style.totalTitle}>Total do Carrinho: G {totalPrice}</Text>
                <Button style={style.shopButton} text="Finalizar Compra" />
            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    containerHeader: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 10,
    },
    iconStyle: {
        color: colors.white,
    },
    listContainer: {
        alignItems: 'flex-start',
        paddingVertical: 20,
    },
    emptyCartBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 60,
        marginVertical: '50%',
    },
    emptyCartText: {
        fontSize: 40,
        fontWeight: 600,
        color: colors.gray,
    },
    emptyIcon: {
        color: colors.gray,
    },
    dataCard: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: colors.gray,
        padding: 10,
        paddingRight: 100,
        marginVertical: 10,
        marginLeft: 20,
    },
    itemName: {
        fontSize: 26,
    },
    countBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemQnt: {
        fontSize: 20,
        marginHorizontal: 16,
        paddingHorizontal: 10,
        borderWidth: 1,
    },
    countTitle: {
        paddingRight: 10,
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttons: {
        width: 30,
        height: 30,
        marginBottom: 18,
        color: colors.white,
        backgroundColor: colors.primary,
        borderRadius: 5,
        elevation: 3,
    },
    deleteButton: {
        alignItems: 'flex-end',
    },
    itemPrice: {
        fontSize: 20,
    },
    itemTotal: {
        fontSize: 20,
    },
    clearButton: {
        backgroundColor: colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginLeft: '30%',
        marginTop: 30,
    },
    shopButton: {
        backgroundColor: colors.confirm,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    totalTitle: {
        fontSize: 16,
        fontWeight: 600,
    },
    footer: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        borderTopWidth: 2,
        borderColor: colors.gray,
    },
});
