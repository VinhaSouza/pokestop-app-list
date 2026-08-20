import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { iconSizes } from '../../themes/iconSizes';
import { Button } from '../Button';

interface PurchaseModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function PurchaseModal ({visible, onClose}: PurchaseModalProps) {
    return (
        <Modal visible={visible} transparent animationType='fade' onRequestClose={onClose}>
            <View style={style.overlay}>
                <View style={style.container}>
                    <Text style={style.title}>Sua compra foi realizada com sucesso!</Text>
                    <MaterialIcons name='check-circle' size={iconSizes.extraLarge} style={style.icon}/>
                
                    <Button text="OK" onPress={onClose} style={style.button}/>
                </View>
            </View>

        </Modal>
    );
}

const style = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.fadedBlack,
    },
    container: {
        backgroundColor: colors.white,
        alignItems: 'center',
        borderRadius: 10,
        paddingBottom: 30,
        paddingHorizontal: 30,
        paddingTop: 20,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: 500,
        textAlign: 'center',
        paddingBottom: 20,
    },
    icon: {
        color: colors.confirm,
    },
    button: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 30,
        backgroundColor: colors.confirm,
    },
})