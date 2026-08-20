import { StyleSheet, Text, TextProps } from 'react-native';
import { colors } from '../themes/colors';

type Props = TextProps & {
    text: string;
};

export function Header({ ...rest }: Props) {
    return <Text style={style.title}>{rest.text}</Text>;
}

const style = StyleSheet.create({
    title: {
        fontSize: 24,
        color: colors.white,
        fontWeight: '900',
        marginTop: 15,
    },
});
