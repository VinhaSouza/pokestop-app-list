import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    TouchableOpacityProps,
    TouchableOpacity,
} from 'react-native';
import { colors } from '../themes/colors';
import { iconSizes } from '../themes/iconSizes';

type Props = TouchableOpacityProps & {
    text: string;
    loading?: boolean;
    loadingText?: string;
};

export function Button({ loading = false, text, onPress, loadingText, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest} onPress={onPress} activeOpacity={0.6} disabled={loading}>
            {loading ? (
                <View style={style.loading}>
                    <ActivityIndicator size={iconSizes.small} />
                    <Text style={style.buttonTitle}>{loadingText ?? text}</Text>
                </View>
            ) : (
                <Text style={style.buttonTitle}>{text}</Text>
            )}
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    buttonTitle: {
        fontSize: 16,
        color: colors.white,
        fontWeight: '600',
    },
    loading: {
        flexDirection: 'row',
    },
});
