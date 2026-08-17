import React from 'react';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { iconSizes } from '../themes/iconSizes';
import { colors } from '../themes/colors';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onFilterPress: () => void;
}

export default function SearchBar({ value, onChangeText, onFilterPress }: SearchBarProps) {
    return (
        <View style={styles.container}>
            <MaterialIcons name="search" size={iconSizes.meddium} style={styles.icon} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder="Pesquisar produto..."
            />
            <TouchableOpacity onPress={onFilterPress}>
                <MaterialIcons name="filter-list" size={iconSizes.meddium} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        height: 50,
        borderWidth: 2,
        borderRadius: 40,
        borderColor: colors.primary,
        paddingHorizontal: 12,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    icon: {
        marginRight: 8,
        color: colors.primary,
    },
    input: {
        flex: 1,
        height: '100%',
    },
});
