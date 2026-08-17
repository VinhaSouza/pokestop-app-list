import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { formatName } from '../utils/formatName';
import { colors } from '../themes/colors';
import { iconSizes } from '../themes/iconSizes';
import { ButtonIcon } from './ButtonIcon';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { Button } from './Button';

interface QuickAddModalProps {
    visible: boolean;
    product: {
        name: string;
        price: number;
    } | null;
    onClose: () => void;
}

export function QuickAddModal({ visible, product, onClose }: QuickAddModalProps) {
    const { getQuantity, increase, decrease } = useContext(CartContext);

    if (!product) {
        return null;
    }

    const quantity = getQuantity(product.name);

    function handleIncrease(amount: number = 1) {
        if (!product) {
            return;
        }
        increase(product, amount);
    }

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={style.overlay}>
                    <View style={style.container}>
                        <Text style={style.productTitle}>{formatName(product.name)}</Text>

                        <View style={style.counterBox}>
                            <ButtonIcon
                                text=""
                                onPress={() => decrease(product.name)}
                                icon={
                                    <MaterialIcons
                                        style={style.buttons}
                                        name="remove"
                                        size={iconSizes.meddium}
                                    />
                                }
                            />

                            <Text style={style.counter}>{quantity}</Text>

                            <ButtonIcon
                                text=""
                                onPress={() => handleIncrease()}
                                icon={
                                    <MaterialIcons
                                        style={style.buttons}
                                        name="add"
                                        size={iconSizes.meddium}
                                    />
                                }
                            />
                        </View>

                        <View style={style.counterBox}>
                            <Button
                                text="+ 5"
                                onPress={() => handleIncrease(5)}
                                style={style.addButtons}
                            />

                            <Button
                                text="+ 10"
                                onPress={() => handleIncrease(10)}
                                style={style.addButtons}
                            />
                        </View>

                        <Button text="FECHAR" onPress={onClose} style={style.closeButton} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const style = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.fadedBlack,
    },
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 130,
        paddingTop: 30,
        paddingBottom: 100,
        borderWidth: 1,
        borderTopEndRadius: 100,
        borderTopStartRadius: 100,
        borderColor: colors.gray,
    },
    productTitle: {
        fontSize: 30,
        textAlign: 'center',
    },
    counterBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttons: {
        color: colors.white,
        backgroundColor: colors.primary,
        borderRadius: 5,
        elevation: 3,
    },
    counter: {
        alignItems: 'center',
        fontSize: 26,
        paddingHorizontal: 20,
        marginVertical: 20,
        marginHorizontal: 20,
        borderWidth: 1,
    },
    addButtons: {
        backgroundColor: colors.primary,
        marginHorizontal: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        elevation: 3,
    },
    closeButton: {
        marginTop: 40,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        marginLeft: 12,
        padding: 12,
        borderRadius: 20,
    },
});
