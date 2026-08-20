import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, View, FlatList, Text, ActivityIndicator, BackHandler } from 'react-native';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { ButtonIcon } from '../components/ButtonIcon';
import { CartContext } from '../contexts/CartContext';
import { colors } from '../themes/colors';
import { iconSizes } from '../themes/iconSizes';
import { ProductsContext } from '../contexts/ProductsContext';
import SearchBar from '../components/SearchBar';
import { filterProducts, ProductFilter } from '../utils/productsFilter';
import LogoutModal from '../components/modals/LogoutModal';
import { QuickAddModal } from '../components/modals/QuickAddModal';
import FilterModal from '../components/modals/FilterModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/AuthContext';

export default function ListPage() {
    const navigation = useNavigation<NavigationProp<any>>();
    const { totalItems } = useContext(CartContext);
    const { products, loading } = useContext(ProductsContext);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<ProductFilter>('all');
    const [filterVisible, setFilterVisible] = useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const displayedProducts = filterProducts(products, search, filter);
    const [quickAddVisible, setQuickAddVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<{ name: string; price: number } | null>(
        null,
    );
    const { setUser } = useContext(AuthContext);

    const handleLogout = async () => {
        setUser(null);

        await AsyncStorage.removeItem('@pokestop:token');
        await AsyncStorage.removeItem('@pokestop:userId');

        setLogoutModalVisible(false);
        navigation.navigate('Login');
    };

    useFocusEffect(
        useCallback(() => {
            const handleBackPress = () => {
                setLogoutModalVisible(true);
                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
            return () => subscription.remove();
        }, []),
    );

    function handleQuickAdd(product: { name: string; price: number }) {
        setSelectedProduct(product);
        setQuickAddVisible(true);
    }

    function handleCloseQuickAdd() {
        setQuickAddVisible(false);
        setSelectedProduct(null);
    }

    return (
        <View style={style.container}>
            <View style={style.containerHeader}>
                <ButtonIcon
                    text=""
                    icon={
                        <MaterialIcons
                            name="arrow-back"
                            size={iconSizes.meddium}
                            style={style.iconStyle}
                        />
                    }
                    onPress={() => setLogoutModalVisible(true)}
                />

                <LogoutModal
                    visible={logoutModalVisible}
                    onCancel={() => setLogoutModalVisible(false)}
                    onConfirm={handleLogout}
                />

                <Header text="PRODUTOS" />

                <View style={style.cartBox}>
                    <ButtonIcon
                        text=""
                        icon={
                            <MaterialIcons
                                name="shopping-cart"
                                size={iconSizes.meddium}
                                style={style.iconStyle}
                            />
                        }
                        onPress={() => navigation.navigate('ShoppingCart')}
                    />
                    <Text style={style.iconCount}>{totalItems}</Text>
                </View>
            </View>

            <SearchBar
                value={search}
                onChangeText={setSearch}
                onFilterPress={() => setFilterVisible(true)}
            />

            <FilterModal
                visible={filterVisible}
                filter={filter}
                onFilterChange={setFilter}
                onClose={() => setFilterVisible(false)}
            />

            {loading ? (
                <View style={style.loading}>
                    <ActivityIndicator size={iconSizes.meddium} />
                    <Text style={style.loadingTitle}>Carregando Produtos...</Text>
                </View>
            ) : (
                <FlatList
                    data={displayedProducts}
                    numColumns={2}
                    keyExtractor={(item) => item.name}
                    columnWrapperStyle={style.row} // Aplica um estilo em cada linha da lista.
                    contentContainerStyle={style.list} // Aplica um estilo ao conteudo inteiro da lista.
                    renderItem={({ item }) => (
                        <ProductCard
                            name={item.name}
                            image={item.image}
                            price={item.price}
                            onPress={() =>
                                navigation.navigate('ProductDetail', {
                                    name: item.name,
                                    price: item.price,
                                    image: item.image,
                                })
                            }
                            onQuickAdd={() =>
                                handleQuickAdd({
                                    name: item.name,
                                    price: item.price,
                                })
                            }
                        />
                    )}
                />
            )}
            <QuickAddModal
                visible={quickAddVisible}
                product={selectedProduct}
                onClose={handleCloseQuickAdd}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerHeader: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 40,
        paddingBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterContainer: {
        width: '80%',
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.gray,
        backgroundColor: colors.white,
    },
    filterTitle: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 15,
    },
    filterOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    closeButton: {
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        backgroundColor: colors.primary,
        borderRadius: 18,
    },
    closeButtonText: {
        color: colors.white,
        fontWeight: 600,
    },
    iconStyle: {
        color: colors.white,
    },
    inputIconStyle: {
        color: colors.inputIcon,
    },
    cartBox: {
        flexDirection: 'row',
    },
    iconCount: {
        position: 'absolute',
        backgroundColor: colors.white,
        borderRadius: 100,
        textAlign: 'center',
        paddingHorizontal: 6,
        marginLeft: 30,
        marginTop: 5,
    },
    row: {
        justifyContent: 'space-between',
    },
    list: {
        padding: 10,
    },
    searchBox: {
        marginHorizontal: 20,
        width: '90%',
        paddingBottom: 20,
    },
    loading: {
        alignItems: 'center',
        paddingVertical: '80%',
    },
    loadingTitle: {
        fontSize: 24,
        color: colors.secondary,
        fontWeight: 600,
    },
});
