import React, { } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../themes/colors';

interface LogoutModalProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function LogoutModal({visible, onCancel, onConfirm}: LogoutModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType='slide'
            onRequestClose={onCancel}
        >
            <View style={style.overlay}>
                <View style={style.container}>
                    <Text style={style.title}>Sair da Conta</Text>

                    <Text style={style.secTitle}>Tem certeza que deseja sair do aplicativo?</Text>

                        <View style={style.options}>
                            <TouchableOpacity style={style.cancelButton} onPress={onCancel}>
                            <Text style={style.buttonTitle}>Cancelar</Text>
                            </TouchableOpacity>
                                    
                            <TouchableOpacity style={style.confirmButton} onPress={onConfirm}>
                            <Text style={style.buttonTitle}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
        </Modal>
    )
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
        paddingBottom: 50,
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    title:{
        fontSize: 20,
        fontWeight: 500,
    },
    secTitle: {
        fontSize: 16,
        marginTop: 6,
    },
    options: {
        flexDirection: 'row',
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: colors.primary,
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    confirmButton: {
        backgroundColor: colors.background,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    buttonTitle: {
        color: colors.white,
        fontWeight: 600,
        fontSize: 18,
    }
})