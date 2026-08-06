import { StyleSheet, Text, TextProps } from 'react-native';

type Props = TextProps & {
    text: string,
}

export function Header({...rest}: Props) {
    return (
            <Text style={style.title} >
                {rest.text}
            </Text> 
    )
}

const style = StyleSheet.create({
    title: {
        fontSize: 24,
        padding: 10,
        color: 'white',
        fontWeight: '900',
        textAlign: 'center',
    }
})