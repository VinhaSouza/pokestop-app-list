import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
import { iconSizes } from '../../themes/iconSizes';
import { filterOptions, ProductFilter } from '../../utils/productsFilter';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

interface FilterModalProps {
    visible: boolean;
    filter: ProductFilter;
    onFilterChange: (filter: ProductFilter) => void;
    onClose: () => void;
}

export default function FilterModal({
    visible,
    filter,
    onFilterChange,
    onClose,
}: FilterModalProps) {
    const handleFilterChange = (selectedFilter: ProductFilter) => {
        onFilterChange(selectedFilter);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={style.modalContainer}>
                <View style={style.filterContainer}>
                    <Text style={style.filterTitle}>Filtrar Produtos</Text>
                    <Pressable
                        style={style.filterOption}
                        onPress={() => handleFilterChange(filterOptions.filterAll)}>
                        <Text>Todos</Text>
                        {filter === filterOptions.filterAll && (
                            <MaterialIcons name="check" size={iconSizes.small} />
                        )}
                    </Pressable>

                    <Pressable
                        style={style.filterOption}
                        onPress={() => handleFilterChange(filterOptions.filterName)}>
                        <Text>Nome: A - Z</Text>
                        {filter === filterOptions.filterName && (
                            <MaterialIcons name="check" size={iconSizes.small} />
                        )}
                    </Pressable>

                    <Pressable
                        style={style.filterOption}
                        onPress={() => handleFilterChange(filterOptions.filtePriceAsc)}>
                        <Text>Menor preço</Text>
                        {filter === filterOptions.filtePriceAsc && (
                            <MaterialIcons name="check" size={iconSizes.small} />
                        )}
                    </Pressable>

                    <Pressable
                        style={style.filterOption}
                        onPress={() => handleFilterChange(filterOptions.filterPriceDesc)}>
                        <Text>Maior preço</Text>
                        {filter === filterOptions.filterPriceDesc && (
                            <MaterialIcons name="check" size={iconSizes.small} />
                        )}
                    </Pressable>

                    <Pressable style={style.closeButton} onPress={onClose}>
                        <Text style={style.closeButtonText}>Fechar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const style = StyleSheet.create({
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
});
